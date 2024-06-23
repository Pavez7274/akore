import { Competence, type Token } from "#structures";
import type { JavaScriptTranspiler } from "../../transpiler";

export class StringCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:javascript:string";
	override patterns = {
		foremost: /\$(string|text)/,
		opener: /\[/,
		closer: /\]/,
	};

	override resolve({ inside }: Token<true>) {
		return this.transpiler.string(inside);
	}
}
