"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
/**
 * @example
 * // Akore code:
 * $var[text;Hello gotou]
 * $print[$get[text]]
 *
 * // Compiled JavaScript:
 * var text = "Hello gotou";
 * console.log(text);
 */
class $var extends instruction_1.Instruction {
    name = "$var";
    id = "$akoreVar";
    async parse({ parameters, total, path }) {
        if (!parameters[0])
            classes_1.Logger.error("At least one argument is required!", total);
        const key = await this.compiler.resolveIdentifierNode(parameters[0]);
        const value = parameters[1] ? await this.compiler.resolveAnyOrStringNode(parameters[1]) : void 0;
        const name = key.name.split(".")[0];
        if (this.compiler.variables.has(name))
            return value ? classes_1.NodeFactory.line([key, classes_1.Nodes.Equal, value]) : key;
        else {
            this.compiler.variables.add(name);
            if (path.includes(".")) {
                this.compiler.program.body.push(classes_1.NodeFactory.line([classes_1.Nodes.Var, key, classes_1.Nodes.Equal, value || classes_1.Nodes.Undefined]));
                return key;
            }
            else
                return value ? classes_1.NodeFactory.line([classes_1.Nodes.Var, key, classes_1.Nodes.Equal, value]) : classes_1.NodeFactory.line([classes_1.Nodes.Var, key]);
        }
    }
}
exports.default = $var;
