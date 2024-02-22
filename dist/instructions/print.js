"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class PrintInstruction extends instruction_1.Instruction {
    name = "$print";
    id = "$akitaPrint";
    compile(task) {
        this.buildStringArguments(task.arguments);
        this.processNestedArguments(task);
        return `console.log(${task.arguments.map((a) => a.value.value)})`;
    }
}
exports.default = PrintInstruction;
