"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class ArrayInstruction extends instruction_1.Instruction {
    name = "$array";
    id = "$akoreArray";
    compile(task) {
        this.processNestedArguments(task);
        return "new Array()";
    }
}
exports.default = ArrayInstruction;
