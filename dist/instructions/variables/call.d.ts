import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
/**
 * Represents the $call instruction.
 * This instruction is used to call a function.
 *
 * @example
 * $call[func;arg1;$get[some];1] // => func("arg1", some, 1);
 * $call[process.exit] // => process.exit();
 */
export default class $call extends Instruction {
    name: "$call";
    id: "$akoreCall";
    parse({ parameters: [key, ...args] }: Token): Promise<Nodes.Node>;
}
