"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class StringInstruction extends instruction_1.Instruction {
    name = "$string";
    id = "$akoreString";
    compile(task) {
        this.buildStringArguments(task.arguments);
        this.processNestedArguments(task);
        return task.argumentValues().join(" ");
    }
}
exports.default = StringInstruction;
