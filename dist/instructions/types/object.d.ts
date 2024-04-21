import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
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
    name: "$object";
    id: "$akoreObject";
    /**
     * Parses the $object instruction and returns the corresponding object node.
     * @param {Token} token - The token containing the instruction and its parameters.
     * @returns {Promise<Nodes.Object | Nodes.Identifier<"null">>} The parsed object node.
     */
    parse({ parameters }: Token): Promise<Nodes.Object | Nodes.Identifier<"null">>;
}
