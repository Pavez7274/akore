import { Nodes, Token } from "../classes";
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
    name: "$escape";
    id: "$akoreEscape";
    parse({ parameters }: Token): Promise<Nodes.Node>;
}
