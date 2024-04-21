import { NodeFactory, Nodes, Token } from "../classes";
import { Instruction } from "../classes/instruction";

/**
 * @example
 * // Akore code:
 * $print[Hello world]
 *
 * // Compiled JavaScript:
 * console.log("Hello world");
 */
export default class $print extends Instruction {
	override name = "$print" as const;
	override id = "$akorePrint" as const;

	public override async parse({ parameters }: Token): Promise<Nodes.CallExpression> {
		return NodeFactory.callExpression(NodeFactory.identifier("console.log"), [
			NodeFactory.expressionStatement(
				await Promise.all(parameters.map(p => this.transpiler.resolveAnyOrStringNode(p))),
			),
		]);
	}
}
