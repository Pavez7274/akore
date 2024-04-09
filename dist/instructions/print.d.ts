import { Nodes, Token } from "../classes";
import { Instruction } from "../classes/instruction";
/**
 * @example
 * // Akore code:
 * $print[Hello world]
 *
 * // Compiled JavaScript:
 * console.log("Hello world");
 */
export default class $print extends Instruction {
    name: "$print";
    id: "$akorePrint";
    parse({ parameters }: Token): Promise<Nodes.CallExpression>;
}
