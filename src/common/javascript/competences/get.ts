import { Competence, type Token } from "#structures";
import { EscapeNode } from "../nodes";
import type { JavaScriptTranspiler } from "../transpiler";

export class GetCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:get";
	override pattern = /\$get/;

	override resolve({ inside }: Token<true>) {
		return new EscapeNode(inside);
	}
}
