import type { Token } from "./lexer";
import type { Node } from "./nodes/node";
import type { Transpiler } from "./transpiler";

export interface Patterns {
	readonly foremost: RegExp;
	readonly opener?: RegExp;
	readonly inside?: RegExp;
	readonly unstoppable?: boolean;
	readonly closer?: RegExp;
	readonly eater?: {
		readonly before?: Competence[];
		readonly after?: Competence[];
	};
}

/**
 * Abstract class representing a competence within the transpiler.
 * @template T - The type of the transpiler that uses this competence.
 */
export abstract class Competence<T extends Transpiler = Transpiler> {
	/** The unique identifier for this competence. */
	abstract readonly identifier: string;

	/**
	 * The regular expression pattern that this competence matches.
	 * @deprecated
	 */
	readonly pattern: RegExp = /DEPRECATED/;

	/** The transpiler instance that this competence belongs to. */
	protected transpiler: T;

	/** The regular expressions patterns that this competence matches. */
	abstract readonly patterns: Patterns;

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

	splitInside(inside: string, splitter = ";") {
		if (!inside.includes(";")) return [inside];
		const parts: string[] = [];

		let current = "";
		let i = 0;
		let depth = 0;
		let char: string;
		while (i < inside.length) {
			char = inside.charAt(i++);
			if (char === splitter && depth === 0) {
				parts.push(current);
				current = "";
			} else if (this.patterns.opener?.test(char)) {
				current += char;
				depth++;
			} else if (this.patterns.closer?.test(char)) {
				current += char;
				depth--;
			} else {
				current += char;
			}
		}

		parts.push(current);

		return parts;
	}
}
