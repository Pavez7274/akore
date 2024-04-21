"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
/**
 * Represents the $compound instruction.
 * This instruction is used to increment/decrement a variable.
 *
 * @example
 * $var[myVar;5] // => var myVar = 5;
 * $compound[myVar;2] // => myVar += 2;
 * $compound[myVar] // => myVar++;
 * $compound[myVar;-1] // => myVar -= 1;
 */
class $compound extends instruction_1.Instruction {
    name = "$compound";
    id = "$akoreCompound";
    async parse({ parameters: [key, by] }) {
        if (!key)
            classes_1.Logger.error("Expected a key for the compound assignment!", this.name);
        const amount = by ? await this.transpiler.resolveNumberTypeNode(by) : classes_1.NodeFactory.numberLiteral(1);
        const line = classes_1.NodeFactory.line([await this.transpiler.resolveIdentifierNode(key)]);
        // If the amount is 1 or -1, we can use the increment/decrement operators.
        // Otherwise, we use the += or -= operators.
        if (amount.value === 1)
            line.parts.push(classes_1.NodeFactory.identifier("++"));
        else if (amount.value === -1)
            line.parts.push(classes_1.NodeFactory.identifier("--"));
        else if (amount.value > 1)
            line.parts.push(classes_1.NodeFactory.identifier("+="), amount);
        else if (amount.value < -1)
            line.parts.push(classes_1.NodeFactory.identifier("-="), classes_1.NodeFactory.numberLiteral(-amount.value));
        else
            classes_1.Logger.warn("Incrementing/decrementing by 0 doesn't change anything.", this.name);
        return line;
    }
}
exports.default = $compound;
