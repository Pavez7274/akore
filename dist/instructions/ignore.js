"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class EscapeInstruction extends instruction_1.Instruction {
    name = "$escape";
    id = "$akitaEscape";
    compile(task) {
        return task.token.total.slice(task.token.name.length + 1, -1);
    }
}
exports.default = EscapeInstruction;
