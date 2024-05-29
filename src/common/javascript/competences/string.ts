import { Competence, type Token } from "#structures";
import type { JavaScriptTranspiler } from "../transpiler";

export class StringCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:string";
	override pattern = /\$(string|text)/;

	override resolve({ inside }: Token<true>) {
		return this.transpiler.string(inside);
	}
}
