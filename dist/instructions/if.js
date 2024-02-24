"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class IfInstruction extends instruction_1.Instruction {
    name = "$if";
    id = "$akitaIf";
    compile(task) {
        this.buildConditionArgument(task.arguments[0]?.token);
        this.processNestedArguments(task);
        const [condition, whenTrue, whenFalse] = task.argValues();
        return `if (${condition}) {${whenTrue}}${whenFalse ? `else {${whenFalse}}` : ""}`;
    }
}
exports.default = IfInstruction;
