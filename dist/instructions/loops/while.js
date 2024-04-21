"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
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
class $while extends instruction_1.Instruction {
    name = "$while";
    id = "$akoreWhile";
    async parse({ parameters: [condition, statement] }) {
        if (!condition)
            classes_1.Logger.error("Expected condition for while loop!", this.name);
        if (!statement)
            classes_1.Logger.error("Expected statement for while loop!", this.name);
        return classes_1.NodeFactory.controlFlow([
            {
                keyword: "while",
                condition: await this.transpiler.resolveConditionTypeNode(condition),
                body: await this.transpiler.resolveProgramTypeNode(statement),
            },
        ]);
    }
}
exports.default = $while;
