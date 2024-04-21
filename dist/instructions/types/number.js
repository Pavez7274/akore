"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
class NumberInstruction extends instruction_1.Instruction {
    name = "$number";
    id = "$akoreNumber";
    async parse({ parameters }) {
        return classes_1.NodeFactory.numberLiteral(Number(this.transpiler.resolveAnyOrStringNode(parameters[0])));
    }
}
exports.default = NumberInstruction;
