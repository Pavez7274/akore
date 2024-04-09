import { NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
import { chunk } from "lodash";

/**
 * @example
 * // Akore code:
 * $object[
 * 	prop1;value;
 * 	prop2;value;
 * 	prop3;gay sex
 * ]
 *
 * // Compiled JavaScript:
 * {
 * 	porp1: "value",
 * 	porp2: "value",
 * 	porp3: "gay sex"
 * }
 */
export default class $object extends Instruction {
	override name = "$object" as const;
	override id = "$akoreObject" as const;

	public override async parse({ parameters }: Token): Promise<Nodes.Object> {
		return NodeFactory.object(
			await Promise.all(
				chunk(parameters, 2).map(async ([key, value]) => {
					key!.value = key!.value.trimStart();
					return {
						key: (await this.compiler.resolveIdentifierNode(key!)).name,
						value: value ? await this.compiler.resolveAnyOrStringNode(value) : void 0,
					};
				}),
			),
		);
	}
}
