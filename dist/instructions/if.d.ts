import { Nodes, Token } from "../classes";
import { Instruction } from "../classes/instruction";
/**
 * Represents the $if instruction.
 * This instruction is used to create an if-else statement.
 * @example
 * $if[$get[some] === 1;
 * 	$var[other;is 1];
 * 	$get[some] === 2;
 * 	$var[other;is 2];
 * 	$var[other;is unknown]
 * ]
 * // =>
 * // var other;
 * // if (some === 1) {
 * //	other = "is 1";
 * // } else if (some === 2) {
 * //	other = "is 2";
 * // } else {
 * //	other = "is unknown";
 * // }
 */
export default class $if extends Instruction {
    name: "$if";
    id: "$akoreIf";
    parse({ parameters: [condition, statement, ...rest] }: Token): Promise<Nodes.Node>;
}
