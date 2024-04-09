import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
/**
 * @example
 * // Akore code:
 * $var[text;Hello gotou]
 * $print[$get[text]]
 *
 * // Compiled JavaScript:
 * var text = "Hello gotou";
 * console.log(text);
 */
export default class $var extends Instruction {
    name: "$var";
    id: "$akoreVar";
    parse({ parameters, total, path }: Token): Promise<Nodes.Identifier<string> | Nodes.Line>;
}
