import { splitInside } from "#common/splitInside";
import { Competence, type Token } from "#structures";
import { EscapeNode, SequenceNode } from "../nodes";
import type { JavaScriptTranspiler } from "../transpiler";

export class SetCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:set";
	override pattern = /\$set/;

	override resolve({ inside }: Token<true>) {
		const [key, value] = splitInside(inside);
		return new SequenceNode({
			elements: [
				new EscapeNode(key),
				new EscapeNode("="),
				new SequenceNode({
					elements: this.transpiler.process(value),
					operator: ", ",
				}),
			],
			operator: " ",
		});
	}
}
