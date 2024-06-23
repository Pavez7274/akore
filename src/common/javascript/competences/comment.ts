import { Competence, type Token } from "#structures";
import { EscapeNode } from "../nodes";
import type { JavaScriptTranspiler } from "../transpiler";

export class CommentCompetence extends Competence<JavaScriptTranspiler> {
	override identifier = "akore:javascript:comment";
	override patterns = {
		foremost: /\$(comment|c)/,
		opener: /\[/,
		closer: /\]/,
	};

	override resolve({ inside }: Token<true>) {
		return new EscapeNode(/\n/.test(inside) ? `/* ${inside} */` : `// ${inside}`);
	}
}
