"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const instruction_1 = require("../classes/instruction");
/**
 * @example
 * // Akore code:
 * $escape[console.log("hi");]
 *
 * // Compiled JavaScript:
 * console.log("hi");
 */
class $escape extends instruction_1.Instruction {
    name = "$escape";
    id = "$akoreEscape";
    async parse({ parameters }) {
        return classes_1.NodeFactory.identifier(parameters.join(";"));
    }
}
exports.default = $escape;
