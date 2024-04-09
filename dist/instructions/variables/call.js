"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
/**
 * @example
 * // Akore code:
 * $call[procces.exit]
 *
 * // Compiled JavaScript:
 * process.exit();
 */
class $call extends instruction_1.Instruction {
    name = "$call";
    id = "$akoreCall";
    async parse({ parameters, total }) {
        if (!parameters[0])
            classes_1.Logger.error("At least one argument is required!", total);
        return classes_1.NodeFactory.callExpression(await this.compiler.resolveIdentifierNode(parameters.shift()), await Promise.all(parameters.map(node => this.compiler.resolveAnyOrStringNode(node))));
    }
}
exports.default = $call;
