"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class ObjectInstruction extends instruction_1.Instruction {
    name = "$object";
    id = "$akitaObject";
    compile(task) {
        this.processNestedArguments(task);
        return "{" + task.argValues().join(",") + "}";
    }
}
exports.default = ObjectInstruction;
