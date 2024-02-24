"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class ContinueInstruction extends instruction_1.Instruction {
    name = "$continue";
    id = "$akitaContinue";
    compile(task) {
        this.processNestedArguments(task);
        return "continue;";
    }
}
exports.default = ContinueInstruction;
