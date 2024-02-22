import { Logger } from "./logger";

export interface TokenArgument {
	value: string;
	nested: Token[];
}

export interface Token {
	name: string;
	total: string;
	start: number;
	end: number;
	arguments: TokenArgument[];
}

export class Lexer {
	#position: number = 0;
	#tokens: Token[] = [];
	#input: string = "";

	constructor(input: string) {
		this.setInput(input);
	}

	public get position(): number {
		return this.#position;
	}
	public get input(): string {
		return this.#input;
	}

	public tokenize(): Token[] {
		while (this.#position < this.#input.length) {
			const currentChar = this.getCurrentChar();
			if (currentChar === "$") {
				this.tokenizeFunction();
			} else {
				this.advance(1);
			}
		}
		return this.#tokens;
	}

	private getCurrentChar(): string {
		return this.#input[this.#position] || "";
	}

	public ended(): boolean {
		return this.#position >= this.#input.length;
	}

	private parseArguments(argumentString: string): TokenArgument[] {
		let args: TokenArgument[] = [];
		let currentArgument = "";
		let depth = 0;

		for (let i = 1; i < argumentString.length - 1; i++) {
			const char = argumentString[i];
			if (char === "[") {
				currentArgument += char;
				depth++;
			} else if (char === "]") {
				currentArgument += char;
				depth--;
			} else if (char === ";" && depth === 0) {
				args.push({ value: currentArgument, nested: [] });
				currentArgument = "";
			} else {
				currentArgument += char;
			}
		}

		if (currentArgument.trim() !== "") {
			args.push({ value: currentArgument, nested: [] });
		}

		args = args.map((arg) => {
			if (arg.value.includes("$")) {
				const lexer = new Lexer(arg.value);
				arg.nested = lexer.tokenize();
			}
			return arg;
		});

		return args;
	}

	private tokenizeFunction(): void {
		const start = this.#position;
		let end = start + 1;

		while (end < this.#input.length && /[A-Za-z_]/.test(this.#input[end] || "")) {
			end++;
		}
		const name = this.#input.substring(start, end);

		while (end < this.#input.length && this.#input[end]?.trim() === "") {
			end++;
		}

		if (end < this.#input.length && this.#input[end] === "[") {
			const startArgs = end;
			let depth = 0;
			while (end < this.#input.length) {
				if (this.#input[end] === "[") {
					depth++;
				} else if (this.#input[end] === "]") {
					depth--;
					if (depth === 0) {
						break;
					}
				}
				end++;
			}
			if (depth === 0) {
				const argsString = this.#input.substring(startArgs, end + 1);
				const args = this.parseArguments(argsString);
				this.#tokens.push({
					name,
					total: this.#input.substring(start, end + 1).trim(),
					start,
					end,
					arguments: args,
				});
				this.advance(end - this.#position + 1);
			} else {
				Logger.error(`Instruction "${name}" does not close correctly`, "Lexer");
			}
		} else {
			this.#tokens.push({
				name,
				total: this.#input.substring(start, end).trim(),
				start,
				end,
				arguments: [],
			});
			this.advance(end - this.#position);
		}
	}

	public setInput(input: string): void {
		this.#input = input;
		this.#position = 0;
	}

	public advance(steps: number): void {
		this.#position += steps;
	}

	public retract(steps: number): void {
		this.#position -= steps;
	}

	public substring(start: number, end: number): string {
		return this.#input.substring(start, end);
	}
}

// ? TEST
// const lexer = new Lexer("$testing[$this;$get[something;second;$unreal]");
// const tokens = lexer.tokenize();
// console.log(require("util").inspect(tokens, { depth: null }));
