import { Logger, NodeFactory, Nodes, Token } from "../classes";
import { Instruction } from "../classes/instruction";

/**
 * Represents the $if instruction.
 * This instruction is used to create an if-else statement.
 * @example
 * $if[$get[some] === 1;
 * 	$var[other;is 1];
 * 	$get[some] === 2;
 * 	$var[other;is 2];
 * 	$var[other;is unknown]
 * ]
 * // =>
 * // var other;
 * // if (some === 1) {
 * //	other = "is 1";
 * // } else if (some === 2) {
 * //	other = "is 2";
 * // } else {
 * //	other = "is unknown";
 * // }
 */
export default class $if extends Instruction {
	override name = "$if" as const;
	override id = "$akoreIf" as const;

	public override async parse({ parameters: [condition, statement, ...rest] }: Token): Promise<Nodes.Node> {
		if (!condition) Logger.error("Expected condition for if statement!", this.name);
		if (!statement) Logger.error("Expected statement for if statement!", this.name);

		// The first part is always the if statement
		const parts: Nodes.ControlFlowPart[] = [
			{
				keyword: "if",
				condition: await this.transpiler.resolveConditionTypeNode(condition),
				body: await this.transpiler.resolveProgramTypeNode(statement),
			},
		];

		// The rest of the parts are else if and else statements
		for (let i = 0; i < rest.length; i += 2) {
			const condition = rest[i];
			const expression = rest[i + 1];
			// If both condition and expression exist, it means that it is being used as else if
			if (condition && expression) {
				parts.push({
					keyword: "else if",
					condition: await this.transpiler.resolveConditionTypeNode(condition),
					body: await this.transpiler.resolveProgramTypeNode(expression),
				});
			}
			// If only condition exists, it means that it is being used as else
			else if (condition && expression === undefined) {
				parts.push({
					keyword: "else",
					body: await this.transpiler.resolveProgramTypeNode(condition),
				});
			}
		}

		return NodeFactory.controlFlow(parts);
	}
}
