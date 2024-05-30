import type { Competence } from "./competence";

export interface Token<P extends true | false> {
	competence: Competence;
	total: P extends true ? `${string}[${string}]` : string;
	inside: P extends true ? string : null;
	match: RegExpExecArray;
	name: string;
}

export interface SupportToken {
	match: RegExpExecArray & ["[" | "]"];
	depth: number;
}

export class Lexer {
	public readonly competences = new Map<string, Competence>();

	public get pattern(): RegExp {
		return new RegExp([...this.competences.values()].map((c) => c.pattern.source).join("|"), "gm");
	}

	public tokenize(code: string) {
		const tokens: Token<boolean>[] = [];
		const regex = this.pattern;
		let min_index = 0;

		for (let match = regex.exec(code), i = 0; match !== null; match = regex.exec(code), i++) {
			const token: Token<boolean> = {
				competence: [...this.competences.values()].find((c) =>
					c.pattern.test(match[0]),
				) as Competence,
				total: match[0],
				inside: null,
				name: match[0],
				match,
			};

			const after = code.slice(match.index + match[0].length);
			if (after && after[0] === "[") {
				token.inside = "";
				let depth = 0;
				for (const char of after.slice(1)) {
					if (char === "]" && depth === 0) break;
					if (char === "[") depth++;
					if (char === "]") depth--;
					token.inside += char;
				}
			}

			token.match.index += min_index;
			token.total += `[${token.inside}]`;
			tokens.push(token);
			min_index += token.total.length - 1;
			code = code.replace(token.total, `<PROCESSED:${Date.now()}>`);
		}

		return tokens;
	}
}
