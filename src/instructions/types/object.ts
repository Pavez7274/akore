import { NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
import { chunk } from "lodash";

/**
 * Represents the $object instruction.
 * This instruction is used to create an object with key-value pairs.
 *
 * If only one argument is provided, the instruction will be resolver using akore object-parsing system.
 * If more than one argument is provided, the instruction will be resolved by coupling the key-value pairs.
 * @example
 * // Single argument
 * $object[
 *    prop1 = value1
 *    prop2 = value2
 * ] // => { prop1: "value1", prop2: "value2" };
 *
 * // Multiple arguments
 * $object[prop1;value1;porp2;value2] // => { prop1: "value1", prop2: "value2" };
 */
export default class $object extends Instruction {
	override name = "$object" as const;
	override id = "$akoreObject" as const;

	/**
	 * Parses the $object instruction and returns the corresponding object node.
	 * @param {Token} token - The token containing the instruction and its parameters.
	 * @returns {Promise<Nodes.Object | Nodes.Identifier<"null">>} The parsed object node.
	 */
	public override async parse({ parameters }: Token): Promise<Nodes.Object | Nodes.Identifier<"null">> {
		if (parameters.length === 0) {
			return NodeFactory.object([]);
		} else if (parameters.length === 1) {
			return this.transpiler.resolveObjectTypeNode(parameters[0]!);
		} else {
			return NodeFactory.object(
				await Promise.all(
					chunk(parameters, 2).map(async ([key, value]) => {
						key!.value = key!.value.trimStart();
						return {
							key: await this.transpiler.resolveIdentifierNode(key!),
							value: value ? await this.transpiler.resolveAnyOrStringNode(value) : void 0,
						};
					}),
				),
			);
		}
	}
}
