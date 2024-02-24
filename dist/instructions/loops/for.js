"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class ForInstruction extends instruction_1.Instruction {
    name = "$for";
    id = "$akitaFor";
    compile(task) {
        this.buildConditionArgument(task.arguments[1]?.token);
        this.processNestedArguments(task);
        const [def, condition, iter, code] = task.argValues();
        return `for (${def};${condition};${iter}) {${code}}`;
    }
}
exports.default = ForInstruction;
