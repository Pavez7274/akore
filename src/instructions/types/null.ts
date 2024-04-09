import {  NodeFactory, Nodes, Token } from "../..";
import { Instruction } from "../../classes/instruction";
import { isEmpty } from "lodash";

/**
 * @example
 * // Akore code:
 * $null
 *
 * // Compiled JavaScript:
 * null;
 */
export default class $null extends Instruction {
	override name = "$null" as const;
	override id = "$akoreNull" as const;
	public override async parse(token: Token): Promise<Nodes.Identifier<"null">> {
		const args = token.parameters.filter(el => el.nested.length > 0);
		if (!isEmpty(args)) {
			for (const { nested } of args) {
				for (const nest of nested) {
					this.compiler.parseToken(nest);
				}
			}
		}

		return NodeFactory.identifier("null");
	}
}
