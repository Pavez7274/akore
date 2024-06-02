import { splitInside } from "#common/split_inside";
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
				this.transpiler.sequence(values.join(";")),
			],
			operator: " ",
		});
	}
}
