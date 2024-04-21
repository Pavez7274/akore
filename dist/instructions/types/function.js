"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
/**
 * @example
 * // Akore code:
 * $function[logInRed;msg;$print[\\x1b[34m$get[msg]]]
 * $call[logInRed;hiii :3]
 *
 * // Compiled JavaScript:
 * function logInRed (msg) {
 * 	console.log(`\x1b[34m${msg}`);
 * }
 * logInRed("hiii :3");
 */
class $function extends instruction_1.Instruction {
    name = "$function";
    id = "$akoreFunction";
    async parse({ parameters: [name, params, body] }) {
        if (!name || !params || !body)
            classes_1.Logger.error("At least three arguments are required!", this.name);
        const keyword = await this.transpiler.resolveIdentifierNode(name);
        return classes_1.NodeFactory.controlFlow([
            {
                keyword: keyword.name === "" ? "function" : `function ${keyword.name}`,
                condition: await this.transpiler.resolveExpressionTypeNode(params),
                body: await this.transpiler.resolveProgramTypeNode(body),
            },
        ]);
    }
}
exports.default = $function;
