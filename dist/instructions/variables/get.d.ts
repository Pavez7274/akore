import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
/**
 * Represents the $get instruction.
 * This instruction is used to get a variable.
 *
 * @example
 * $var[text;Surfing The Void] // => var text = "Surfing the void";
 * $get[text] // => text1;
 */
export default class $get extends Instruction {
    name: "$get";
    id: "$akoreGet";
    parse({ parameters }: Token): Promise<Nodes.Node>;
}
