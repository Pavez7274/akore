"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
/**
 * Represents the $call instruction.
 * This instruction is used to call a function.
 *
 * @example
 * $call[func;arg1;$get[some];1] // => func("arg1", some, 1);
 * $call[process.exit] // => process.exit();
 */
class $call extends instruction_1.Instruction {
    name = "$call";
    id = "$akoreCall";
    async parse({ parameters: [key, ...args] }) {
        if (!key)
            classes_1.Logger.error("Expected a key for the call!", this.name);
        return classes_1.NodeFactory.callExpression(await this.transpiler.resolveIdentifierNode(key), await Promise.all(args.map(token => this.transpiler.resolveAnyOrStringNode(token))));
    }
}
exports.default = $call;
