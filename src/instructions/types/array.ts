import { NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

/**
 * @example
 * // Akore code:
 * $array[1;2;three]
 *
 * // Compiled JavaScript:
 * [1, 2, "three"]
 */
export default class $array extends Instruction {
	override name = "$array" as const;
	override id = "$akoreArray" as const;

	public override async parse({ parameters }: Token): Promise<Nodes.Array> {
		return NodeFactory.array(
			await Promise.all(parameters.map(param => this.compiler.resolveAnyOrStringNode(param))),
		);
	}
}
