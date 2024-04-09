import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
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
    name: "$string";
    id: "$akoreString";
    parse({ parameters, }: Token): Promise<Nodes.StringLiteral | Nodes.InterpolatedString>;
}
