import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
/**
 * Represents the $var instruction.
 * This instruction is used to create a variable.
 *
 * @example
 * $var[text1;Hello Gotou!] // => var text1 = "Hello Gotou!";
 * $var[text2] // => var text2;
 * $var[text3;$call[text1.replace;Hello;Fuck]] // => var text3 = text1.replace("Hello", "Fuck");
 * $print[$get[text1]] // => console.log(text1);
 * $print[$get[text3]] // => console.log(text3);
 */
export default class $var extends Instruction {
    name: "$var";
    id: "$akoreVar";
    parse({ parameters: [name, value], total, path }: Token): Promise<Nodes.Identifier<string> | Nodes.Line>;
}
