"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class NullInstruction extends instruction_1.Instruction {
    name = "$null";
    id = "$akitaNull";
    compile(task) {
        this.processNestedArguments(task);
        return "null";
    }
}
exports.default = NullInstruction;
