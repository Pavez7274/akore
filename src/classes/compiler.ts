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

	public argValues(): string[] {
		return this.arguments.map((arg) => arg.value.value);
	}

	public compile(): string {
		return this.instruction.compile(this);
	}
}

export class Compiler {
	private lexer = new Lexer("");
	public busy: boolean = false;
	#output: string = "";
	#input: string = "";

	constructor(
		input: string,
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

	public compile() {
		if (this.busy) {
			Logger.warn("The compiler is busy!", "Compiler");
			return;
		}
		this.busy = true;
		const tasks: Task[] = this.createTasksFromTokens(this.lexer.tokenize());

		// console.log(require("util").inspect(tasks, { depth: null }));

		for (const task of tasks) {
			this.appendToOutput(task.compile() + ";\n");
		}

		return minify(this.#output).code;
	}
}