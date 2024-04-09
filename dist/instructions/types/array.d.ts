import { Nodes, Token } from "../../classes";
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
    name: "$array";
    id: "$akoreArray";
    parse({ parameters }: Token): Promise<Nodes.Array>;
}
