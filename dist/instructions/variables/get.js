"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
/**
 * Represents the $get instruction.
 * This instruction is used to get a variable.
 *
 * @example
 * $var[text;Surfing The Void] // => var text = "Surfing the void";
 * $get[text] // => text1;
 */
class $get extends instruction_1.Instruction {
    name = "$get";
    id = "$akoreGet";
    async parse({ parameters }) {
        if (!parameters.length)
            classes_1.Logger.error("Expected a key for the get!", this.name);
        return classes_1.NodeFactory.line(await Promise.all(parameters.map(token => this.transpiler.resolveIdentifierNode(token))), ".");
    }
}
exports.default = $get;
