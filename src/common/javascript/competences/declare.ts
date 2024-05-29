import { splitInside } from "#common/splitInside";
import { Competence, type Token } from "#structures";
import { EscapeNode, SequenceNode } from "../nodes";
import type { JavaScriptTranspiler } from "../transpiler";

export class DeclareCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:declare";
	override pattern = /\$declare/;

	override resolve({ inside }: Token<true>) {
		const [key, ...values] = splitInside(inside);
		return new SequenceNode({
			elements: [
				new EscapeNode(`var ${key}`),
				new EscapeNode("="),
				new SequenceNode({
					elements: values.map((value) => new EscapeNode(this.transpiler.stringify(value))),
					operator: ", ",
				}),
			],
			operator: " ",
		});
	}
}
