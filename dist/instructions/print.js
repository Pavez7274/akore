"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class PrintInstruction extends instruction_1.Instruction {
    name = "$print";
    id = "$akorePrint";
    compile(task) {
        this.buildStringArguments(task.arguments);
        this.processNestedArguments(task);
        return `console.log(${task.argumentValues().join(",")})`;
    }
}
exports.default = PrintInstruction;
