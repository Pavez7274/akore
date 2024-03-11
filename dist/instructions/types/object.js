"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class ObjectInstruction extends instruction_1.Instruction {
    name = "$object";
    id = "$akoreObject";
    compile(task) {
        this.processNestedArguments(task);
        return "new Object()";
    }
}
exports.default = ObjectInstruction;
