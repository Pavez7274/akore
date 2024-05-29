import { typeToString } from "#common";
import type { Competence } from "./competence";
import { Lexer, type Token } from "./lexer";
import { Logger } from "./logger";
import { type Node, Registry } from "./nodes";

export abstract class Transpiler {
	public readonly registry: Registry;
	public readonly logger = new Logger();
	public readonly lexer = new Lexer();

	// biome-ignore lint/suspicious/noExplicitAny: As stated in schema.ts, a schema can receive any type of value
	constructor(nodes: Record<string, any>) {
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

	public resolve(code: string): Node<unknown>[] {
		return this.nodes(this.lexer.tokenize(code));
	}

	public nodes(tokens: Token<boolean>[]) {
		const nodes: Node<unknown>[] = [];

		for (const token of tokens) {
			try {
				const node = token.competence.resolve(token);
				if (this.registry.validate(node)) nodes.push(node);
				else {
					const expected = this.registry.schemas[node.type].toString(2);
					const received = `${node.constructor.name} {\n\t${typeToString(node.value, 2)}\n\t}`;
					throw new Error(
						`The Follow value does not match the expected scheme:\nExpected:\n\t${expected}\n\nReceived:\n\t${received}`,
					);
				}
			} catch (error) {
				this.logger.error(`Error compiling ${token.total}:\n${(<Error>error).message}`);
			}
		}

		return nodes;
	}
}
