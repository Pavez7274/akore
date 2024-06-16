import { Competence, type Token } from "#structures";
import { CallerNode, EscapeNode } from "../../nodes";
import { JavaScriptTranspiler } from "../../transpiler";

class ObjectPropertyCompetence extends Competence<JavaScriptTranspiler> {
	override readonly identifier = "akore:object:property";
	override patterns = {
		foremost: /\$property/,
		opener: /\[/,
		closer: /\]/,
	};

	public resolve({ inside }: Token<true>) {
		const [name, value] = this.splitInside(inside);
		return new EscapeNode(`${name}: ${this.transpiler.string(value).toCode()}`);
	}
}

export class ObjectCompetence extends Competence<JavaScriptTranspiler> {
	override readonly identifier = "akore:object";
	override patterns = {
		foremost: /\$object/,
		opener: /\[/,
		closer: /\]/,
	};

	public resolve({ inside }: Token<boolean>) {
		const t = new JavaScriptTranspiler();
		t.declare(new ObjectPropertyCompetence(t));
		return new CallerNode({
			callee: new EscapeNode("Object"),
			parameters: inside ? [new EscapeNode(`{ ${t.sequence(inside).toCode()} }`)] : [],
			use_zero: false,
		});
	}
}
