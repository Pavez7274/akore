import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
/**
 * @example
 * // Akore code:
 * $function[logInRed;msg;$print[\\x1b[34m$get[msg]]]
 * $call[logInRed;hiii :3]
 *
 * // Compiled JavaScript:
 * function logInRed (msg) {
 * 	console.log(`\x1b[34m${msg}`);
 * }
 * logInRed("hiii :3");
 */
export default class $function extends Instruction {
    name: "$function";
    id: "$akoreFunction";
    parse({ parameters: [name, params, body] }: Token): Promise<Nodes.ControlFlow>;
}
