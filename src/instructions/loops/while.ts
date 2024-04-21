import { NodeFactory, Token, Nodes, Logger } from "../../classes";
import { Instruction } from "../../classes/instruction";

/**
 * Represents the $while instruction.
 * This instruction is used to create a while loop.
 * @example
 * $var[n;0]
 * $while[$get[n] < 5;
 * 	$var[n;$sum[$get[n];1]]
 * ]
 * $pint[$get[n]]
 * // while (n < 5) {
 * //	n = n + 1;
 * // }
 * // console.log(n); // => 5
 */
export default class $while extends Instruction {
	override name = "$while" as const;
	override id = "$akoreWhile" as const;

	public override async parse({ parameters: [condition, statement] }: Token): Promise<Nodes.ControlFlow> {
		if (!condition) Logger.error("Expected condition for while loop!", this.name);
		if (!statement) Logger.error("Expected statement for while loop!", this.name);

		return NodeFactory.controlFlow([
			{
				keyword: "while",
				condition: await this.transpiler.resolveConditionTypeNode(condition),
				body: await this.transpiler.resolveProgramTypeNode(statement),
			},
		]);
	}
}
