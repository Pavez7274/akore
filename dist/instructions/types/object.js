"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
const lodash_1 = require("lodash");
/**
 * Represents the $object instruction.
 * This instruction is used to create an object with key-value pairs.
 *
 * If only one argument is provided, the instruction will be resolver using akore object-parsing system.
 * If more than one argument is provided, the instruction will be resolved by coupling the key-value pairs.
 * @example
 * // Single argument
 * $object[
 *    prop1 = value1
 *    prop2 = value2
 * ] // => { prop1: "value1", prop2: "value2" };
 *
 * // Multiple arguments
 * $object[prop1;value1;porp2;value2] // => { prop1: "value1", prop2: "value2" };
 */
class $object extends instruction_1.Instruction {
    name = "$object";
    id = "$akoreObject";
    /**
     * Parses the $object instruction and returns the corresponding object node.
     * @param {Token} token - The token containing the instruction and its parameters.
     * @returns {Promise<Nodes.Object | Nodes.Identifier<"null">>} The parsed object node.
     */
    async parse({ parameters }) {
        if (parameters.length === 0) {
            return classes_1.NodeFactory.object([]);
        }
        else if (parameters.length === 1) {
            return this.transpiler.resolveObjectTypeNode(parameters[0]);
        }
        else {
            return classes_1.NodeFactory.object(await Promise.all((0, lodash_1.chunk)(parameters, 2).map(async ([key, value]) => {
                key.value = key.value.trimStart();
                return {
                    key: await this.transpiler.resolveIdentifierNode(key),
                    value: value ? await this.transpiler.resolveAnyOrStringNode(value) : void 0,
                };
            })));
        }
    }
}
exports.default = $object;
