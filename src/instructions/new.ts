import { NodeFactory, Nodes, Token } from "../classes";
import { Instruction } from "../classes/instruction";

/**
 * @example
 * // Akore code:
 * $new[Set;$array[value 1;value 2;value 3]]
 *
 * // Compiled JavaScript:
 * new Set(["value 1", "value 2", "value 3"]);
 */
export default class $new extends Instruction {
	override name = "$new" as const;
	override id = "$akoreNew" as const;

	public override async parse({ parameters }: Token): Promise<Nodes.CallExpression> {
		return NodeFactory.callExpression(
			NodeFactory.line([
				NodeFactory.identifier("new"),
				await this.transpiler.resolveIdentifierNode(parameters.shift()!),
			]),
			[
				NodeFactory.expressionStatement(
					await Promise.all(parameters.map(p => this.transpiler.resolveAnyOrStringNode(p))),
				),
			],
		);
	}
}
