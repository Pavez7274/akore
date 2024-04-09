import { Nodes, Token } from "../..";
import { Instruction } from "../../classes/instruction";
/**
 * @example
 * // Akore code:
 * $null
 *
 * // Compiled JavaScript:
 * null;
 */
export default class $null extends Instruction {
    name: "$null";
    id: "$akoreNull";
    parse(token: Token): Promise<Nodes.Identifier<"null">>;
}
