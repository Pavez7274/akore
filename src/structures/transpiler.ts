import type { Competence } from "./competence";
import { Lexer } from "./lexer";
import { Logger } from "./logger";
import { type Node, Registry, type Schema } from "./nodes";

export abstract class Transpiler {
	public readonly registry: Registry;
	public readonly logger = new Logger();
	public readonly lexer = new Lexer();

	constructor(nodes: Record<string, Schema>) {
		this.registry = new Registry(nodes);
	}

	abstract toCode(code: string): string;

	public declare(...competences: Competence[]) {
		for (const competence of competences) {
			if (this.lexer.competences.has(competence.identifier))
				this.logger.warn(
					`Competence "${competence.identifier}" is already defined, so it will be overwritten.`,
				);
			this.lexer.competences.set(competence.identifier, competence);
		}
	}

	public process(code: string): Node<unknown>[] {
		// this.logger.debug(`Transpiling:\n${code}`);
		const nodes: Node<unknown>[] = [];

		const tokens = this.lexer.tokenize(code);
		// this.logger.debug(
		// 	`Tokens:\n${JSON.stringify(
		// 		tokens,
		// 		(key, value) => (key === "competence" ? value.identifier : value),
		// 		2,
		// 	)}`,
		// );

		for (const token of tokens) {
			try {
				const node = token.competence.resolve(token);
				// this.logger.debug(`Value:\n${JSON.stringify(node.value, null, 2)}`);
				nodes.push(node);
			} catch (error) {
				this.logger.error(`Error compiling ${token.total}:\n${(<Error>error).message}`);
			}
		}

		return nodes;
	}
}
