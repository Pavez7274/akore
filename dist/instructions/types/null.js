"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const instruction_1 = require("../../classes/instruction");
const lodash_1 = require("lodash");
/**
 * @example
 * // Akore code:
 * $null
 *
 * // Compiled JavaScript:
 * null;
 */
class $null extends instruction_1.Instruction {
    name = "$null";
    id = "$akoreNull";
    async parse(token) {
        const args = token.parameters.filter(el => el.nested.length > 0);
        if (!(0, lodash_1.isEmpty)(args)) {
            for (const { nested } of args) {
                for (const nest of nested) {
                    this.transpiler.parseToken(nest);
                }
            }
        }
        return __1.NodeFactory.identifier("null");
    }
}
exports.default = $null;
