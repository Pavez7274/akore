"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
/**
 * Represents the $var instruction.
 * This instruction is used to create a variable.
 *
 * @example
 * $var[text1;Hello Gotou!] // => var text1 = "Hello Gotou!";
 * $var[text2] // => var text2;
 * $var[text3;$call[text1.replace;Hello;Fuck]] // => var text3 = text1.replace("Hello", "Fuck");
 * $print[$get[text1]] // => console.log(text1);
 * $print[$get[text3]] // => console.log(text3);
 */
class $var extends instruction_1.Instruction {
    name = "$var";
    id = "$akoreVar";
    async parse({ parameters: [name, value], total, path }) {
        if (!name)
            classes_1.Logger.error("Expected a name for the variable!", total);
        const key = await this.transpiler.resolveIdentifierNode(name);
        const val = value ? await this.transpiler.resolveAnyOrStringNode(value) : undefined;
        const first = key.name.split(".")[0]; // Get the first part of the variable name
        // If the variable already exists, update it
        if (this.transpiler.variables.has(first)) {
            return val ? classes_1.NodeFactory.line([key, classes_1.Nodes.Equal, val]) : key;
        }
        else {
            // If the variable doesn't exist, add it to the variables set
            this.transpiler.variables.add(first);
            // If the variable is child of another instruction, declare it outside the father instruction
            // and return the assignment
            if (path.includes(".")) {
                this.transpiler.program.body.push(classes_1.NodeFactory.line([classes_1.Nodes.Var, key]));
                return classes_1.NodeFactory.line([key, classes_1.Nodes.Equal, val || classes_1.Nodes.Undefined]);
            }
            else {
                // Otherwise, declare the variable and return the assignment
                return val ? classes_1.NodeFactory.line([classes_1.Nodes.Var, key, classes_1.Nodes.Equal, val]) : classes_1.NodeFactory.line([classes_1.Nodes.Var, key]);
            }
        }
    }
}
exports.default = $var;
