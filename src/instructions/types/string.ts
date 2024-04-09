import { NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
import { isEmpty } from "lodash";

/**
 * @example
 * // Akore code:
 * $string
 * $string[hi]
 *
 * // Compiled JavaScript:
 * "";
 * "hi";
 */
export default class $string extends Instruction {
	override name = "$string" as const;
	override id = "$akoreString" as const;

	public override async parse({
		parameters,
	}: Token): Promise<Nodes.StringLiteral | Nodes.InterpolatedString> {
		return isEmpty(parameters)
			? NodeFactory.stringLiteral("")
			: NodeFactory.interpolatedString(
					await Promise.all(parameters.map(this.compiler.resolveStringTypeNode)),
				);
	}
}
