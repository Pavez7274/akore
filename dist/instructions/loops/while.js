"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class WhileInstruction extends instruction_1.Instruction {
    name = "$while";
    id = "$akoreWhile";
    compile(task) {
        this.buildConditionArgument(task.arguments[0]?.token);
        this.processNestedArguments(task);
        const [condition, code] = task.argumentValues();
        return `while (${condition}) {${code}}`;
    }
}
exports.default = WhileInstruction;
