import { Logger, NodeFactory, Token } from "../../classes";
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
	override name = "$break" as const;
	override id = "$akoreBreak" as const;

	public override async parse({ path }: Token) {
		if (!/\$while|\$for/.test(path)) Logger.error("$break only works in $while or $for!");
		return NodeFactory.identifier("break");
	}
}
