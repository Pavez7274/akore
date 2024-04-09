"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const instruction_1 = require("../classes/instruction");
const lodash_1 = require("lodash");
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
class $if extends instruction_1.Instruction {
    name = "$if";
    id = "$akoreIf";
    async parse({ parameters }) {
        if (parameters.length < 2)
            classes_1.Logger.error("At least two arguments are required!", this.name);
        const parts = [
            {
                keyword: "if",
                condition: await this.compiler.resolveConditionTypeNode(parameters.shift()),
                body: await this.compiler.resolveProgramTypeNode(parameters.shift()),
            },
        ];
        for (const [condition, expression] of (0, lodash_1.chunk)(parameters)) {
            if (condition && expression) {
                parts.push({
                    keyword: "else if",
                    condition: await this.compiler.resolveConditionTypeNode(condition),
                    body: await this.compiler.resolveProgramTypeNode(expression),
                });
            }
            else if (condition) {
                // If only condition exists, it means that it is being used as else
                parts.push({
                    keyword: "else",
                    body: await this.compiler.resolveProgramTypeNode(condition),
                });
            }
        }
        return classes_1.NodeFactory.controlFlow(parts);
    }
}
exports.default = $if;
