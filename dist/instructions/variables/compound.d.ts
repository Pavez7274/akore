import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
/**
 * Represents the $compound instruction.
 * This instruction is used to increment/decrement a variable.
 *
 * @example
 * $var[myVar;5] // => var myVar = 5;
 * $compound[myVar;2] // => myVar += 2;
 * $compound[myVar] // => myVar++;
 * $compound[myVar;-1] // => myVar -= 1;
 */
export default class $compound extends Instruction {
    name: "$compound";
    id: "$akoreCompound";
    parse({ parameters: [key, by] }: Token): Promise<Nodes.Node>;
}
