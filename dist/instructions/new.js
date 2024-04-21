"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const instruction_1 = require("../classes/instruction");
/**
 * @example
 * // Akore code:
 * $new[Set;$array[value 1;value 2;value 3]]
 *
 * // Compiled JavaScript:
 * new Set(["value 1", "value 2", "value 3"]);
 */
class $new extends instruction_1.Instruction {
    name = "$new";
    id = "$akoreNew";
    async parse({ parameters }) {
        return classes_1.NodeFactory.callExpression(classes_1.NodeFactory.line([
            classes_1.NodeFactory.identifier("new"),
            await this.transpiler.resolveIdentifierNode(parameters.shift()),
        ]), [
            classes_1.NodeFactory.expressionStatement(await Promise.all(parameters.map(p => this.transpiler.resolveAnyOrStringNode(p)))),
        ]);
    }
}
exports.default = $new;
