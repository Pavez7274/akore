"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class SumInstruction extends instruction_1.Instruction {
    name = "$sum";
    id = "$akoreSum";
    compile(task) {
        this.buildStringArguments(task.arguments);
        this.processNestedArguments(task);
        return `${task.argumentValues().join("+")}`;
    }
}
exports.default = SumInstruction;
