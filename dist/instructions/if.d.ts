import { Nodes, Token } from "../classes";
import { Instruction } from "../classes/instruction";
/**
 * @example
 * // Akore code:
 * $if[$get[some] === 3;
 * 		$call[doSomething;$get[some]];
 * 	$get[some] === 4;
 * 		$call[dontSomething;$get[some]];
 * 	$call[doElse;$get[some]];
 * ]
 *
 * // Compiled JavaScript:
 * if (some === 3) {
 * 	doSomething(some);
 * } else if (some === 4) {
 * 	dontSomething(some);
 * } else {
 * 	doElse(some);
 * }
 */
export default class $if extends Instruction {
    name: "$if";
    id: "$akoreIf";
    parse({ parameters }: Token): Promise<Nodes.Node>;
}
