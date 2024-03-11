"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class NumberInstruction extends instruction_1.Instruction {
    name = "$number";
    id = "$akoreNumber";
    compile(task) {
        this.buildNumberArgument(task.arguments[0]?.token);
        this.processNestedArguments(task);
        return task.arguments[0]?.token.value || "NaN";
    }
}
exports.default = NumberInstruction;
