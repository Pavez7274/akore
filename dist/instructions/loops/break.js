"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
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
class $break extends instruction_1.Instruction {
    name = "$break";
    id = "$akoreBreak";
    async parse({ path }) {
        if (!/\$while|\$for/.test(path))
            classes_1.Logger.error("$break only works in $while or $for!");
        return classes_1.NodeFactory.identifier("break");
    }
}
exports.default = $break;
