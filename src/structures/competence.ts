import type { Token } from "./lexer";
import type { Node } from "./nodes/node";
import type { Transpiler } from "./transpiler";

export abstract class Competence<T extends Transpiler = Transpiler> {
	abstract readonly identifier: string;
	abstract readonly pattern: RegExp;
	protected transpiler: T;
	constructor(t: T) {
		this.transpiler = t;
	}

	abstract resolve(token: Token<boolean>): Node<unknown>;
}
