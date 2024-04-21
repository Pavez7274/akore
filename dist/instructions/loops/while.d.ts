import { Token, Nodes } from "../../classes";
import { Instruction } from "../../classes/instruction";
/**
 * Represents the $while instruction.
 * This instruction is used to create a while loop.
 * @example
 * $var[n;0]
 * $while[$get[n] < 5;
 * 	$var[n;$sum[$get[n];1]]
 * ]
 * $pint[$get[n]]
 * // while (n < 5) {
 * //	n = n + 1;
 * // }
 * // console.log(n); // => 5
 */
export default class $while extends Instruction {
    name: "$while";
    id: "$akoreWhile";
    parse({ parameters: [condition, statement] }: Token): Promise<Nodes.ControlFlow>;
}
