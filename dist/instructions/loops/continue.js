"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
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
class $continue extends instruction_1.Instruction {
    name = "$continue";
    id = "$akoreContinue";
    async parse({ path }) {
        if (!/\$while|\$for/.test(path))
            classes_1.Logger.error("$continue only works in $while or $for!");
        return classes_1.NodeFactory.identifier("continue");
    }
}
exports.default = $continue;
