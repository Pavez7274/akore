"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class BreakInstruction extends instruction_1.Instruction {
    name = "$break";
    id = "$akitaBreak";
    compile(task) {
        this.processNestedArguments(task);
        return "break;";
    }
}
exports.default = BreakInstruction;
