import { Competence, type Token } from "#structures";
import { EscapeNode, SequenceNode } from "../nodes";
import type { JavaScriptTranspiler } from "../transpiler";

export class SetCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:javascript:set";
	override patterns = {
		foremost: /\$set/,
		opener: /\[/,
		closer: /\]/,
	};

	override resolve({ inside }: Token<true>) {
		const [key, value] = this.splitByDelimiter(inside);
		return new SequenceNode({
			elements: [
				new EscapeNode(key),
				new EscapeNode("="),
				new SequenceNode({
					elements: this.transpiler.resolve(value),
					operator: ", ",
				}),
			],
			operator: " ",
		});
	}
}
