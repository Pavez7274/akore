import { Competence, type Token } from "#structures";
import { CallerNode, EscapeNode } from "../nodes";
import type { JavaScriptTranspiler } from "../transpiler";

export class CallCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:javascript:call";
	override patterns = {
		foremost: /\$([A-z_](\.?[A-z_])*)\*/,
		opener: /\[/,
		closer: /\]/,
	};

	override resolve({ inside, match }: Token<boolean>) {
		return new CallerNode({
			callee: new EscapeNode(match[1]),
			parameters: inside ? this.transpiler.sequence(inside) : [],
			use_zero: true,
		});
	}
}
