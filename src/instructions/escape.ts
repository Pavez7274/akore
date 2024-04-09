import { NodeFactory, Nodes, Token } from "../classes";
import { Instruction } from "../classes/instruction";

/**
 * @example
 * // Akore code:
 * $escape[console.log("hi");]
 *
 * // Compiled JavaScript:
 * console.log("hi");
 */
export default class $escape extends Instruction {
	override name = "$escape" as const;
	override id = "$akoreEscape" as const;

	public override async parse({ parameters }: Token): Promise<Nodes.Node> {
		return NodeFactory.identifier(parameters.join(";"));
	}
}
