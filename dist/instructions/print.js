"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const instruction_1 = require("../classes/instruction");
/**
 * @example
 * // Akore code:
 * $print[Hello world]
 *
 * // Compiled JavaScript:
 * console.log("Hello world");
 */
class $print extends instruction_1.Instruction {
    name = "$print";
    id = "$akorePrint";
    async parse({ parameters }) {
        return classes_1.NodeFactory.callExpression(classes_1.NodeFactory.identifier("console.log"), [
            classes_1.NodeFactory.expressionStatement(await Promise.all(parameters.map(p => this.compiler.resolveAnyOrStringNode(p)))),
        ]);
    }
}
exports.default = $print;
