import { Token } from "../../classes";
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
    name: "$continue";
    id: "$akoreContinue";
    parse({ path }: Token): Promise<import("../../classes").Nodes.Identifier<"continue">>;
}
