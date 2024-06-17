import { Logger, Node, Transpiler } from "#structures";
import * as competences from "./competences";
import { CallerNode, EscapeNode, Program, SequenceNode } from "./nodes";

/**
 * A transpiler for JavaScript code, extending the abstract Transpiler class.
 */
export class JavaScriptTranspiler extends Transpiler {
	public readonly logger = new Logger();

	/**
	 * Constructs a new JavaScriptTranspiler instance.
	 * Initializes the schema for various node types and declares competences.
	 */
	constructor() {
		super({
			// Primitives
			control_flow: { identifier: Node, block: Node },
			program: [Node],
			string: [Node],
			number: [Node],

			// Other
			sequence: { elements: [Node], operator: "string" },
			caller: { callee: Node, parameters: Node, use_zero: "boolean" },
			escape: "string",
		});

		for (const competence of Object.values(competences)) {
			this.declare(new competence(this));
		}
	}

	/**
	 * Transpiles the given code into JavaScript code.
	 * @param code - The input code to transpile.
	 * @returns The transpiled JavaScript code.
	 */
	public toCode(code: string): string {
		return this.registry.resolve(
			new Program(new EscapeNode('"use strict"'), ...this.resolve(code)),
		);
	}

	/**
	 * Transpiles a code into a SequenceNode.
	 * @param code - The input code to transpile.
	 * @param operator - The operator to use between sequence elements.
	 * @returns A SequenceNode representing the transpiled code.
	 */
	public sequence(code: string, operator = ", ") {
		return new SequenceNode({
			elements: this.nodes(...this.lexer.tokenize(code)),
			operator,
		});
	}

	/**
	 * Transpiles a code into a String.
	 * @param code - The input code to transpile.
	 * @returns A CallerNode representing the transpiled string code.
	 */
	public string(code: string) {
		const tokens = [...this.lexer.tokenize(code)];

		if (tokens.length === 0) return new EscapeNode(`"${code}"`);

		const parts: Node<unknown>[] = [];
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			const before = code.slice(0, token.match.index);
			if (before) parts.push(new EscapeNode(`"${before}"`));
			parts.push(token.competence.resolve(token));
			if (i === tokens.length) {
				const after = code.slice(token.match.index + token.total.length);
				if (after) parts.push(new EscapeNode(`"${after}"`));
			}
		}

		return new CallerNode({
			callee: new EscapeNode("String"),
			parameters: new SequenceNode({
				elements: parts,
				operator: " + ",
			}),
			use_zero: false,
		});
	}

	/**
	 * Transpiles a code into a Number.
	 * @param code - The input code to transpile.
	 * @returns A CallerNode representing the transpiled number code.
	 */
	public number(code: string) {
		const tokens = [...this.lexer.tokenize(code)];

		if (tokens.length === 0) return new EscapeNode(Number.isNaN(code) ? "NaN" : code);

		const parts: Node<unknown>[] = [];
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			const before = code.slice(0, token.match.index);
			if (before) parts.push(new EscapeNode(Number.isNaN(before) ? "NaN" : before));
			parts.push(token.competence.resolve(token));
			if (i === tokens.length) {
				const after = code.slice(token.match.index + token.total.length);
				if (after) parts.push(new EscapeNode(Number.isNaN(after) ? "NaN" : after));
			}
		}

		return new CallerNode({
			callee: new EscapeNode("Number"),
			parameters: new SequenceNode({
				elements: parts,
				operator: " + ",
			}),
			use_zero: false,
		});
	}
}
