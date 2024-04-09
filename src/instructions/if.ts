import { Logger, NodeFactory, Nodes, Token } from "../classes";
import { Instruction } from "../classes/instruction";
import { chunk } from "lodash";

/**
 * @example
 * // Akore code:
 * $if[$get[some] === 3;
 * 		$call[doSomething;$get[some]];
 * 	$get[some] === 4;
 * 		$call[dontSomething;$get[some]];
 * 	$call[doElse;$get[some]];
 * ]
 *
 * // Compiled JavaScript:
 * if (some === 3) {
 * 	doSomething(some);
 * } else if (some === 4) {
 * 	dontSomething(some);
 * } else {
 * 	doElse(some);
 * }
 */
export default class $if extends Instruction {
	override name = "$if" as const;
	override id = "$akoreIf" as const;

	public override async parse({ parameters }: Token): Promise<Nodes.Node> {
		if (parameters.length < 2) Logger.error("At least two arguments are required!", this.name);

		const parts: Nodes.ControlFlowPart[] = [
			{
				keyword: "if",
				condition: await this.compiler.resolveConditionTypeNode(parameters.shift()!),
				body: await this.compiler.resolveProgramTypeNode(parameters.shift()!),
			},
		];

		for (const [condition, expression] of chunk(parameters)) {
			if (condition && expression) {
				parts.push({
					keyword: "else if",
					condition: await this.compiler.resolveConditionTypeNode(condition),
					body: await this.compiler.resolveProgramTypeNode(expression),
				});
			} else if (condition) {
				// If only condition exists, it means that it is being used as else
				parts.push({
					keyword: "else",
					body: await this.compiler.resolveProgramTypeNode(condition),
				});
			}
		}

		return NodeFactory.controlFlow(parts);
	}
}
