import type { Token } from "./lexer";
import type { Node } from "./nodes/node";
import type { Transpiler } from "./transpiler";

/**
 * Abstract class representing a competence within the transpiler.
 * @template T - The type of the transpiler that uses this competence.
 */
export abstract class Competence<T extends Transpiler = Transpiler> {
	/** The unique identifier for this competence. */
	abstract readonly identifier: string;
	/** The regular expression pattern that this competence matches. */
	abstract readonly pattern: RegExp;
	/** The transpiler instance that this competence belongs to. */
	protected transpiler: T;

	/**
	 * Creates a new competence.
	 * @param t - The transpiler instance that this competence belongs to.
	 */
	constructor(t: T) {
		this.transpiler = t;
	}

	/**
	 * Resolves a token into a node.
	 * @param token - The token to resolve.
	 * @returns The node resulting from the resolution of the token.
	 */
	abstract resolve(token: Token<boolean>): Node<unknown>;
}
