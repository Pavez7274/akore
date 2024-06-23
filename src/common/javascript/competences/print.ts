import { Competence, type Token } from "#structures";
import { CallerNode, EscapeNode } from "../nodes";
import type { JavaScriptTranspiler } from "../transpiler";

export class PrintCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:javascript:print";
	override patterns = {
		foremost: /\$(printf?|(console\.)?log)/,
		opener: /\[/,
		closer: /\]/,
	};

	override resolve({ inside }: Token<true>) {
		return new CallerNode({
			callee: new EscapeNode("console.log"),
			parameters: this.transpiler.resolve(inside),
			use_zero: true,
		});
	}
}
