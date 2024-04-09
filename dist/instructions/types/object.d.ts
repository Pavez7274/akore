import { Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
/**
 * @example
 * // Akore code:
 * $object[
 * 	prop1;value;
 * 	prop2;value;
 * 	prop3;gay sex
 * ]
 *
 * // Compiled JavaScript:
 * {
 * 	porp1: "value",
 * 	porp2: "value",
 * 	porp3: "gay sex"
 * }
 */
export default class $object extends Instruction {
    name: "$object";
    id: "$akoreObject";
    parse({ parameters }: Token): Promise<Nodes.Object>;
}
