import { Token } from "../../classes";
import { Instruction } from "../../classes/instruction";
/**
 * @example
 * // Akore code:
 * $while[some condition;
 * 	$if[$get[some] === $get[other];
 * 		$break
 * 	]
 * ]
 *
 * // Compiled JavaScript:
 * while ("some condition") {
 * 	if (some === other) {
 * 		break;
 * 	}
 * }
 */
export default class $break extends Instruction {
    name: "$break";
    id: "$akoreBreak";
    parse({ path }: Token): Promise<import("@/classes/nodes").Nodes.Identifier<"break">>;
}
