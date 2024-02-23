import { minify } from "uglify-js";
import { Instruction, InstructionsManager } from "./instruction";
import { TokenArgument, Lexer, Token } from "./lexer";
import { Logger } from "./logger";

export interface TaskArgument {
	value: TokenArgument;
	nested: Task[];
}

export class Task {
	public arguments: TaskArgument[] = [];
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
						value: arg,
						nested: compiler.createTasksFromTokens(arg.nested),
					};
				} else {
					this.arguments[i] = {
						value: arg,
						nested: [],
					};
				}
			}
		}
	}

	public argValues<T extends string[]>(): T {
		return this.arguments.map((arg) => arg.value.value) as T;
	}

	public compile(): string {
		return this.instruction.compile(this);
	}
}

export class Compiler {
	private lexer = new Lexer("");
	public busy: boolean = false;
	public vars: string[] = [];
	#output: string = "";
	#input: string = "";

	constructor(
		input: string = "",
		public instructionsManager: InstructionsManager = new InstructionsManager()
	) {
		this.lexer.setInput(input);
		this.#input = input;
	}

	public get output(): string {
		return this.#output;
	}

	public get input(): string {
		return this.#input;
	}

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
			if (instruction) {
				tasks.push(new Task(token, instruction, this));
			}
		}
		return tasks;
	}

	public findInstructionForToken(token: Token): Instruction | undefined {
		return this.instructionsManager.instructions.find(
			(instruction) => instruction.name === token.name
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

	public async compile(debug: boolean = false): Promise<string | void> {
		if (this.busy) {
			Logger.warn("The compiler is already busy!", "Compiler");
			return;
		}
		const start = Date.now();

		this.busy = true;
		if (debug) {
			Logger.debug("Compiler set to busy", "Compiler");
		}

		const tasks: Task[] = this.createTasksFromTokens(this.lexer.tokenize());
		if (debug) {
			Logger.debug(`Tasks created: ${tasks.length}`, "Compiler.compile");
		}

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
					Logger.debug(`Task ${i + 1} compiled successfully: ${compiled}`, "Compiler.compile");
				}
				this.appendToOutput(compiled + ";\n");
			} catch (error) {
				Logger.error(
					`Error compiling task ${i + 1}: ${(error as Error).message}`,
					"Compiler.compile"
				);
			}
		}

		const minified = minify(this.vars.join("") + this.#output).code;
		if (debug) {
			Logger.debug(
				`Compilation completed in ${Date.now() - start} miliseconds.\nInput code:\n${
					this.#input
				}\nOutput code:\n${minified}`,
				"Compiler.compile"
			);
		}

		this.vars = [];
		this.#output = "";
		if (debug) {
			Logger.debug("Data was cleared", "Compiler.compile");
		}
		this.busy = false;
		if (debug) {
			Logger.debug("Compiler set to idle", "Compiler.compile");
		}

		return minified;
	}
}
