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

	public index_supports(code: string) {
		let max_depth = -1;
		let depth = 0;

		const matches = Array.from(
			code.matchAll(/[\[\]]/g) as IterableIterator<SupportToken["match"]>,
			(match): SupportToken => {
				if (match[0] === "[") {
					if (max_depth === depth) {
						max_depth++;
					}
					return { match, depth: depth++ };
				}
				return { match, depth: --depth };
			},
		);

		const supports_by_depth = new Map<number, SupportToken[]>();

		for (const support of matches) {
			if (!supports_by_depth.has(support.depth)) {
				supports_by_depth.set(support.depth, []);
			}
			supports_by_depth.get(support.depth)?.push(support);
		}

		return supports_by_depth;
	}

	public tokenize(code: string) {
		const tokens: Token<boolean>[] = [];
		const regex = this.pattern;
		let min_index = 0;

		for (let match = regex.exec(code), i = 0; match !== null; match = regex.exec(code), i++) {
			const supports = Array.from(this.index_supports(code).values()).flat();
			const start = supports.find(
				(support) =>
					support.match[0] === "[" && support.match.index === match.index + match[0].length,
			);
			const end = supports.find(
				(support) => start && support.match[0] === "]" && support.depth === start.depth,
			);

			const inside = start && end ? code.slice(start.match.index + 1, end.match.index) : null;
			const name = match[0];

			match.index += min_index;

			const token = {
				competence: [...this.competences.values()].find((c) => c.pattern.test(name)) as Competence,
				total: inside ? `${name}[${inside}]` : name,
				inside,
				match,
				name,
			};
			tokens.push(token);
			min_index += token.total.length - 1;
			code = code.replace(token.total, `<PROCESSED:${Date.now()}>`);
		}

		return tokens;
	}
}
