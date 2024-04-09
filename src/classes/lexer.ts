import { Manager } from "./instruction";
import { Logger } from "./logger";

export interface TokenParameter {
	value: string;
	nested: Token[];
}

export interface Token {
	path: string;
	name: string;
	total: string;
	start: number;
	end: number;
	parameters: TokenParameter[];
}

export class Lexer {
	#position: number = 0;
	#tokens: Token[] = [];
	#path: string[] = [];
	#input: string = "";

	constructor(
		input: string,
		path: string[] = [],
		public manager: Manager,
	) {
		this.setInput(input);
		this.#path.push(...path);
	}

	public get position(): number {
		return this.#position;
	}

	public get path(): string {
		return this.#path.join(".");
	}

	public get input(): string {
		return this.#input;
	}

	public tokenize(): Token[] {
		this.#tokens = [];
		while (!this.ended()) {
			if (this.getPreviuosChar() !== "\\" && this.getCurrentChar() === "$") this.tokenizeFunction();
			else this.advance(1);
		}
		return this.#tokens;
	}

	private getPreviuosChar(): string {
		return this.#input[this.#position - 1] || "";
	}

	private getCurrentChar(): string {
		return this.#input[this.#position] || "";
	}

	public ended(): boolean {
		return this.#position >= this.#input.length;
	}

	private parseParameters(paramString: string): TokenParameter[] {
		let params: TokenParameter[] = [],
			current = "",
			depth = 0;

		for (let i = 1; i < paramString.length - 1; i++) {
			const char = paramString[i];
			if (char === "[") {
				current += char;
				depth++;
			} else if (char === "]") {
				current += char;
				depth--;
			} else if (char === ";" && depth === 0) {
				params.push({ value: current, nested: [] });
				current = "";
			} else current += char;
		}

		if (current.trim() !== "") params.push({ value: current, nested: [] });

		params = params.map(param => {
			if (param.value.includes("$")) {
				const lexer = new Lexer(param.value, this.#path, this.manager);
				param.nested = lexer.tokenize();
			}
			return param;
		});

		return params;
	}

	private tokenizeFunction(): void {
		const start = this.#position;
		let end = start + 1;

		while (end < this.#input.length && /[A-Za-z_]/.test(this.#input[end] || "")) {
			end++;
		}

		const name = this.#input.substring(start, end);
		if (!this.manager.instructions.some(i => i.id === name || i.name === name)) return this.advance(1);
		this.#path.push(name);

		while (end < this.#input.length && this.#input[end]?.trim() === "") {
			end++;
		}

		if (end < this.#input.length && this.#input[end] === "[") {
			const startParams = end;
			let depth = 0,
				escaped = false;
			while (end < this.#input.length) {
				if (this.#input[end] === "\\") escaped = true;
				else if (escaped) {
					escaped = false;
					end++;
				} else if (this.#input[end] === "[") depth++;
				else if (this.#input[end] === "]") {
					depth--;
					if (depth === 0) break;
				}
				end++;
			}

			if (depth === 0) {
				const paramsString = this.substring(startParams, end + 1),
					parameters = this.parseParameters(paramsString);
				this.#tokens.push({
					name,
					total: this.substring(start, end + 1).trim(),
					start,
					end,
					parameters,
					path: this.path,
				});
				this.advance(end - this.#position + 1);
			} else {
				Logger.error(`Instruction "${name}" does not close correctly`, "Lexer");
			}
		} else {
			this.#tokens.push({
				name,
				total: this.substring(start, end).trim(),
				start,
				end,
				parameters: [],
				path: this.path,
			});
			this.advance(end - this.#position);
		}
		this.#path.pop();
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
// const lexer = new Lexer("$testing[$this;$get[something;second;$unreal]]");
// const tokens = lexer.tokenize();
// console.log(require("util").inspect(tokens, { depth: null }));
