import { splitInside } from "#common/split_inside";
import { Competence, type Token } from "#structures";
import { CallerNode, EscapeNode } from "../../nodes";
import { JavaScriptTranspiler } from "../../transpiler";

class ObjectPropertyCompetence extends Competence<JavaScriptTranspiler> {
	override readonly identifier = "akore:object:property";
	override readonly pattern = /\$property?/;

	public resolve({ inside }: Token<true>) {
		const [name, value] = splitInside(inside);
		return new EscapeNode(`${name}: ${this.transpiler.string(value).toCode()}`);
	}
}

export class ObjectCompetence extends Competence<JavaScriptTranspiler> {
	override readonly identifier = "akore:object";
	override readonly pattern = /\$object/;

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
