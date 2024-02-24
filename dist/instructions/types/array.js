"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class ArrayInstruction extends instruction_1.Instruction {
    name = "$array";
    id = "$akitaArray";
    compile(task) {
        this.processNestedArguments(task);
        return "[" + task.argValues().join(",") + "]";
    }
}
exports.default = ArrayInstruction;
