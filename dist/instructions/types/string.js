"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
const lodash_1 = require("lodash");
/**
 * @example
 * // Akore code:
 * $string
 * $string[hi]
 *
 * // Compiled JavaScript:
 * "";
 * "hi";
 */
class $string extends instruction_1.Instruction {
    name = "$string";
    id = "$akoreString";
    async parse({ parameters, }) {
        return (0, lodash_1.isEmpty)(parameters)
            ? classes_1.NodeFactory.stringLiteral("")
            : classes_1.NodeFactory.interpolatedString(await Promise.all(parameters.map(this.transpiler.resolveStringTypeNode)));
    }
}
exports.default = $string;
