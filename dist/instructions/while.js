"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class WhileInstruction extends instruction_1.Instruction {
    name = "$while";
    id = "$akitaWhile";
    compile(task) {
        this.buildConditionArgument(task.arguments[0]?.value);
        this.processNestedArguments(task);
        const [condition, code] = task.argValues();
        return `while (${condition}) {${code}}`;
    }
}
exports.default = WhileInstruction;
