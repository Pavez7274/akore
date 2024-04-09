import { Logger, NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

/**
 * @example
 * // Akore code:
 * $call[procces.exit]
 *
 * // Compiled JavaScript:
 * process.exit();
 */
export default class $call extends Instruction {
	override name = "$call" as const;
	override id = "$akoreCall" as const;
	public override async parse({ parameters, total }: Token): Promise<Nodes.Node> {
		if (!parameters[0]) Logger.error("At least one argument is required!", total);

		return NodeFactory.callExpression(
			await this.compiler.resolveIdentifierNode(parameters.shift()!),
			await Promise.all(parameters.map(node => this.compiler.resolveAnyOrStringNode(node))),
		);
	}
}
