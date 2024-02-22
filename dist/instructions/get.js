"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class GetInstruction extends instruction_1.Instruction {
    name = "$get";
    id = "$akitaGet";
    compile(task) {
        this.processNestedArguments(task);
        return task.argValues().join(".");
    }
}
exports.default = GetInstruction;
