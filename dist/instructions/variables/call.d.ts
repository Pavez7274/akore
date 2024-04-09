import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
/**
 * @example
 * // Akore code:
 * $call[procces.exit]
 *
 * // Compiled JavaScript:
 * process.exit();
 */
export default class $call extends Instruction {
    name: "$call";
    id: "$akoreCall";
    parse({ parameters, total }: Token): Promise<Nodes.Node>;
}
