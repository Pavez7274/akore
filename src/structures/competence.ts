import type { Token } from "./lexer";
import type { Node } from "./nodes/node";
import type { Transpiler } from "./transpiler";

export interface Patterns {
	/** Regular expression to match the foremost pattern in the code. */
	readonly foremost: RegExp;

	/** Optional regular expression to match the opening delimiter of a nested structure. */
	readonly opener?: RegExp;

	/** Optional regular expression to match the valid content inside a nested structure. */
	readonly inside?: RegExp;

	/** Optional flag indicating if the parsing should continue even if the inside pattern does not match. */
	readonly unstoppable?: boolean;

	/** Optional regular expression to match the closing delimiter of a nested structure. */
	readonly closer?: RegExp;

	/** Optional object defining patterns to be eaten before or after the main patterns. */
	readonly eater?: {
		/** Array of competences to be consumed before the main patterns. */
		readonly before?: (typeof Competence)[];

		/** Array of competences to be consumed after the main patterns. */
		readonly after?: (typeof Competence)[];
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

	/**
	 * Splits the inside string by a specified delimiter, accounting for nested structures defined by opener and closer patterns.
	 * @param inside - The string to split.
	 * @param delimiter - The delimiter to split the string by. Defaults to ";".
	 * @yields An array of substrings split by the delimiter.
	 */
	protected *splitByDelimiter(inside: string, delimiter = ";"): Generator<string> {
		let current = "";
		let i = 0;
		let depth = 0;
		let char: string;

		while (i < inside.length) {
			char = inside.charAt(i++);
			if (char === delimiter && depth === 0) {
				yield current;
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

		if (current) {
			yield current;
		}
	}
}
