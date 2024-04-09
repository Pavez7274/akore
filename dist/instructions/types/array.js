"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
/**
 * @example
 * // Akore code:
 * $array[1;2;three]
 *
 * // Compiled JavaScript:
 * [1, 2, "three"]
 */
class $array extends instruction_1.Instruction {
    name = "$array";
    id = "$akoreArray";
    async parse({ parameters }) {
        return classes_1.NodeFactory.array(await Promise.all(parameters.map(param => this.compiler.resolveAnyOrStringNode(param))));
    }
}
exports.default = $array;
