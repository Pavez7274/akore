"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class StringInstruction extends instruction_1.Instruction {
    name = "$string";
    id = "$akitaString";
    compile(task) {
        this.buildStringArguments(task.arguments);
        this.processNestedArguments(task);
        return task.argValues().join(" ");
    }
}
exports.default = StringInstruction;
