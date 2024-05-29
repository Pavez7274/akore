import { Logger, Node, Transpiler } from "#structures";
import {
	CallCompetence,
	DeclareCompetence,
	GetCompetence,
	PrintCompetence,
	SetCompetence,
	StringCompetence,
} from "./competences";
import { EscapeNode, Program, SequenceNode, StringNode } from "./nodes";

export class JavaScriptTranspiler extends Transpiler {
	public readonly logger = new Logger();

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

		this.declare(
			new CallCompetence(this),
			new DeclareCompetence(this),
			new GetCompetence(this),
			new PrintCompetence(this),
			new SetCompetence(this),
			new StringCompetence(this),
		);
	}

	public toCode(code: string): string {
		return this.registry.resolve(
			new Program(new EscapeNode('"use strict"'), ...this.resolve(code)),
		);
	}

	public stringify(code: string): string {
		return new SequenceNode({
			elements: this.nodes(this.lexer.tokenize(code)),
			operator: " ",
		}).toCode();
	}

	public string(code: string): StringNode<Node<unknown>[]> {
		const tokens = this.lexer.tokenize(code);

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

		return new StringNode(
			new SequenceNode({
				elements: parts,
				operator: " + ",
			}),
		);
	}
}
