import {  Logger, NodeFactory, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

/**
* @example
* // Akore code:
* $var[arr;$array]
* $for[$var[i;0];$get[i] < 26;$increment[i];
* 	$if[$modulo[$get[i];2] === 0;
* 		$call[arr.push;$get[i]];
* 		$continue
* 	]
* ]
* 
* // Compiled JavaScript:
* 
*/
export default class $continue extends Instruction {
	override name = "$continue" as const;
	override id = "$akoreContinue" as const;

	public override async parse({ path }: Token) {
		if (!/\$while|\$for/.test(path)) Logger.error("$continue only works in $while or $for!");
		return NodeFactory.identifier("continue");
	}
}