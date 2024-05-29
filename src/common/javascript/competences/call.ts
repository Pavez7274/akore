import { splitInside } from "#common/splitInside";
import { Competence, type Token } from "#structures";
import { CallerNode, EscapeNode, SequenceNode } from "../nodes";
import type { JavaScriptTranspiler } from "../transpiler";

export class CallCompetence extends Competence {
	override identifier = "akore:call";
	override pattern = /\$call/;

	override resolve({ inside }: Token<true>) {
		const [callee, ...parameters] = splitInside(inside);
		return new CallerNode({
			callee: new EscapeNode(callee),
			parameters: new SequenceNode({
				elements: parameters.map(
					(parameter) =>
						new EscapeNode((<JavaScriptTranspiler>this.transpiler).stringify(parameter)),
				),
				operator: ", ",
			}),
			use_zero: true,
		});
	}
}
