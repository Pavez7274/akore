import { typeToString } from "#common";
import type { Competence } from "./competence";
import { Lexer, type Token } from "./lexer";
import { Logger } from "./logger";
import { type Node, Registry } from "./nodes";

/**
 * Abstract base class for creating a transpiler.
 * Handles schema validation, competence management, and code tokenization.
 */
export abstract class Transpiler {
	/** Registry for storing and validating schemas */
	public readonly registry: Registry;

	/** Logger instance for logging messages */
	public readonly logger: Logger;

	/** Lexer instance for tokenizing input code */
	public readonly lexer: Lexer;

	/**
	 * Constructs a new Transpiler instance.
	 * @param schemas - Record of schemas used for validation.
	 * @param lexer - Instance of Lexer for tokenizing code. Defaults to a new Lexer instance.
	 * @param logger - Instance of Logger for logging messages. Defaults to a new Logger instance.
	 */
	// biome-ignore lint/suspicious/noExplicitAny: As stated in schema.ts, a schema can receive any type of value
	constructor(schemas: Record<string, any>, lexer = new Lexer(), logger = new Logger()) {
		this.registry = new Registry(schemas);
		this.logger = logger;
		this.lexer = lexer;
	}

	/**
	 * Transpiles the given code to a target format.
	 * @param code - The input code to transpile.
	 * @returns The transpiled code as a string.
	 */
	abstract toCode(code: string): string;

	/**
	 * Declares competences to be used by the lexer.
	 * @param competences - Competences to declare.
	 */
	public declare(...competences: Competence[]) {
		for (const competence of competences) {
			if (this.lexer.competences.has(competence.identifier))
				this.logger.warn(
					"TRANSPILER",
					`Competence "${competence.identifier}" is already defined, so it will be overwritten.`,
				);
			this.lexer.competences.set(competence.identifier, competence);
		}
	}

	/**
	 * Undeclares competences based on their identifiers.
	 * @param identifiers - Identifiers of the competences to undeclare.
	 */
	public undeclare(...identifiers: string[]) {
		for (const identifier of identifiers) {
			if (this.lexer.competences.has(identifier)) {
				this.lexer.competences.delete(identifier);
			} else {
				this.logger.warn("TRANSPILER", `Competence "${identifier}" is not defined.`);
			}
		}
	}

	/**
	 * Resolves the input code into an array of nodes.
	 * @param code - The input code to resolve.
	 * @returns An array of nodes.
	 */
	public resolve(code: string): Node<unknown>[] {
		return this.nodes(this.lexer.tokenize(code));
	}

	/**
	 * Converts tokens into nodes, validating them against the registry schemas.
	 * @param tokens - Tokens to convert into nodes.
	 * @returns An array of nodes.
	 */
	public nodes(tokens: Token<boolean>[]): Node<unknown>[] {
		const nodes: Node<unknown>[] = [];

		for (const token of tokens) {
			try {
				const node = token.competence.resolve(token);
				if (this.registry.validate(node)) nodes.push(node);
				else {
					const expected = this.registry.schemas[node.type].toString(2);
					const received = `${node.constructor.name} {\n\t${typeToString(node.value, 2)}\n\t}`;
					throw new Error(
						`The following value does not match the expected schema:\nExpected:\n\t${expected}\n\nReceived:\n\t${received}`,
					);
				}
			} catch (error) {
				this.logger.error(
					"TRANSPILER",
					`Error compiling ${token.total}:\n${this.logger.format((<Error>error).stack as string)}`,
				);
				break;
			}
		}

		return nodes;
	}
}
