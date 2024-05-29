import { Competence, type Token } from "#structures";
import { CallerNode, EscapeNode } from "../nodes";
import type { JavaScriptTranspiler } from "../transpiler";

export class PrintCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:print";
	override pattern = /\$(printf?|(console\.)?log)/;

	override resolve({ inside }: Token<true>) {
		return new CallerNode({
			callee: new EscapeNode("console.log"),
			parameters: this.transpiler.process(inside),
			use_zero: true,
		});
	}
}
