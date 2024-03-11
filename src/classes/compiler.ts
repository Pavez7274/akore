import { minify } from "uglify-js";
import { Instruction, InstructionStatus, InstructionsManager } from "./instruction";
import { TokenArgument, Lexer, Token } from "./lexer";
import { Logger } from "./logger";

/**
 * Represents an argument in a compilation task.
 */
export interface TaskArgument {
	token: TokenArgument;
	nested: Task[];
}

/**
 * Represents a compilation task.
 */
export class Task {
	public arguments: TaskArgument[] = [];
	/**
	 * Creates an instance of Task.
	 * @param token The token associated with the task.
	 * @param instruction The instruction associated with the task.
	 * @param compiler The compiler instance.
	 */
	constructor(
		public readonly token: Token,
		public readonly instruction: Instruction,
		public readonly compiler: Compiler
	) {
		for (let i = 0; i < token.arguments.length; i++) {
			const arg = token.arguments[i];
			if (arg) {
				if (arg.nested.length > 0) {
					this.arguments[i] = {
						token: arg,
						nested: compiler.createTasksFromTokens(arg.nested),
					};
				} else {
					this.arguments[i] = {
						token: arg,
						nested: [],
					};
				}
			}
		}
	}

	/**
	 * Retrieves the values of the arguments in the task.
	 * @returns An array of argument values.
	 */
	public argumentValues<T extends string[]>(): T {
		return this.arguments.map((arg) => arg.token.value) as T;
	}

	/**
	 * Compiles the task.
	 * @returns The compiled code for the task.
	 */
	public compile(): string {
		return this.instruction.compile(this);
	}
}

export class Compiler {
	private lexer = new Lexer("");
	public busy: boolean = false;
	public variables = new Set<{ key: string; value?: string }>();
	#output: string = "";
	#input: string = "";

	/**
	 * Creates an instance of Compiler.
	 * @param input The input code to compile.
	 * @param instructionsManager The instructions manager instance.
	 */
	constructor(
		input: string = "",
		public instructionsManager: InstructionsManager = new InstructionsManager()
	) {
		this.lexer.setInput(input);
		this.#input = input;
	}

	/**
	 * Retrieves the compiled output.
	 */
	public get output(): string {
		return this.#output;
	}

	/**
	 * Retrieves the input code.
	 */
	public get input(): string {
		return this.#input;
	}

	/**
	 * Sets the input code for compilation.
	 * @param input The input code to set.
	 * @returns The Compiler instance for method chaining.
	 */
	public setInput(input: string): this {
		if (this.busy) {
			Logger.warn("The compiler is already busy!", "Compiler.setInput");
		} else {
			this.lexer.setInput((this.#input = input));
		}
		return this;
	}

	public createTasksFromTokens(tokens: Token[]): Task[] {
		const tasks: Task[] = [];
		for (const token of tokens) {
			const instruction = this.findInstructionForToken(token);
			if (instruction && instruction.status === InstructionStatus.Enabled) {
				tasks.push(new Task(token, instruction, this));
			}
		}
		return tasks;
	}

	public findInstructionForToken(token: Token): Instruction | undefined {
		return this.instructionsManager.instructions.find(
			(instruction) => instruction.id === token.name || instruction.name === token.name
		);
	}

	public appendToOutput(value: string): void {
		this.#output += value;
	}

	public prependToOutput(value: string): void {
		this.#output = value + this.#output;
	}

	public insertAtLine(lineNumber: number, value: string): void {
		const lines = this.#output.split("\n");
		if (lineNumber >= 0 && lineNumber < lines.length) {
			lines[lineNumber] += value;
			this.#output = lines.join("\n");
		}
	}

	public insertAtPosition(position: number, value: string): void {
		if (position >= 0 && position <= this.#output.length) {
			this.#output = this.#output.slice(0, position) + value + this.#output.slice(position);
		}
	}

	/**
	 * Compiles the input code.
	 * @param debug Indicates whether debug mode is enabled.
	 * @returns The compiled code, or void if an error occurred.
	 */
	public async compile(
		debug: boolean = false,
		minifyOutput: boolean = false
	): Promise<string | void> {
		if (this.busy) {
			Logger.warn("The compiler is already busy!", "Compiler.compile");
			return;
		}

		const start = Date.now();
		this.busy = true;

		if (debug) {
			Logger.debug("Compiler set to busy", "Compiler");
		}

		// Create tasks from tokens
		const tasks: Task[] = this.createTasksFromTokens(this.lexer.tokenize());

		if (debug) {
			Logger.debug(`Tasks created: ${tasks.length}`, "Compiler.compile");
		}

		// Compile tasks
		for (let i = 0; i < tasks.length; i++) {
			const task = tasks[i]!;
			if (debug) {
				Logger.debug(
					`Compiling task ${i + 1} of ${tasks.length}: ${task.token.total}`,
					"Compiler.compile"
				);
			}

			try {
				const compiled = task.compile();
				if (debug) {
					Logger.debug(`Task ${i + 1} compiled successfully:\n${compiled}`, "Compiler.compile");
				}
				this.appendToOutput(compiled + ";\n");
			} catch (error) {
				Logger.error(
					`Error compiling task ${i + 1}: ${(error as Error).message}`,
					"Compiler.compile"
				);
			}
		}

		// Minify the output
		this.#output = `var ${Array.from(this.variables)
			.map((x) => (x.value ? `${x.key}=${x.value}` : x.key))
			.join(", ")};${this.#output}`;
		const code = minifyOutput
			? minify(this.#output, { output: { beautify: true } }).code
			: this.#output;

		if (debug) {
			Logger.debug(
				`Compilation completed in ${Date.now() - start} miliseconds.\nInput code:\n${
					this.#input
				}\nOutput code:\n${code}`,
				"Compiler.compile"
			);
		}

		// Clear data
		this.variables.clear();
		this.#output = "";

		if (debug) {
			Logger.debug("Data was cleared", "Compiler.compile");
		}

		this.busy = false;

		if (debug) {
			Logger.debug("Compiler set to idle", "Compiler.compile");
		}

		return code;
	}

	public addVariable(priority: boolean, key: string, value?: string): void {
		if (priority) {
			this.variables = new Set([...this.variables].filter((x) => x.key !== key));
		}
		this.variables.add({ key, value });
	}

	public addInstruction(...instructions: Instruction[]): void {
		this.instructionsManager.add(...instructions);
	}

	/**
	 * Loads instructions from the specified directory.
	 * @param path The directory path containing instruction files.
	 * @returns True if the instructions were loaded successfully, otherwise false.
	 */
	public loaddir(path: string): boolean {
		return this.instructionsManager.loaddir(path, this);
	}

	public disableInstructions(...names: string[]) {
		for (const name of names) {
			const index = this.instructionsManager.instructions.findIndex(
				(instruction) => instruction.id === name || instruction.name === name
			);
			if (index !== -1) {
				this.instructionsManager.instructions[index]?.disable();
			}
		}
	}

	public enableInstructions(...names: string[]) {
		for (const name of names) {
			const index = this.instructionsManager.instructions.findIndex(
				(instruction) => instruction.id === name || instruction.name === name
			);
			if (index !== -1) {
				this.instructionsManager.instructions[index]?.enable();
			}
		}
	}
}
