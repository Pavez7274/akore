import { Competence, type Token } from "#structures";
import { EscapeNode, SequenceNode } from "../nodes";
import type { JavaScriptTranspiler } from "../transpiler";

export class DeclareCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:javascript:declare";
	override patterns = {
		foremost: /\$declare/,
		opener: /\[/,
		closer: /\]/,
	};

	override resolve({ inside }: Token<true>) {
		const [key, ...values] = this.splitByDelimiter(inside);
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
