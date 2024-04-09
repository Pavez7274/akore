import { Nodes, Token } from "../classes";
import { Instruction } from "../classes/instruction";
/**
 * @example
 * // Akore code:
 * $new[Set;$array[value 1;value 2;value 3]]
 *
 * // Compiled JavaScript:
 * new Set(["value 1", "value 2", "value 3"]);
 */
export default class $new extends Instruction {
    name: "$new";
    id: "$akoreNew";
    parse({ parameters }: Token): Promise<Nodes.CallExpression>;
}
