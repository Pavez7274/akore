"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
const lodash_1 = require("lodash");
/**
 * @example
 * // Akore code:
 * $object[
 * 	prop1;value;
 * 	prop2;value;
 * 	prop3;gay sex
 * ]
 *
 * // Compiled JavaScript:
 * {
 * 	porp1: "value",
 * 	porp2: "value",
 * 	porp3: "gay sex"
 * }
 */
class $object extends instruction_1.Instruction {
    name = "$object";
    id = "$akoreObject";
    async parse({ parameters }) {
        return classes_1.NodeFactory.object(await Promise.all((0, lodash_1.chunk)(parameters, 2).map(async ([key, value]) => {
            key.value = key.value.trimStart();
            return {
                key: (await this.compiler.resolveIdentifierNode(key)).name,
                value: value ? await this.compiler.resolveAnyOrStringNode(value) : void 0,
            };
        })));
    }
}
exports.default = $object;
