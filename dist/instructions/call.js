"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class CallInstruction extends instruction_1.Instruction {
    name = "$call";
    id = "$akoreCall";
    compile(task) {
        for (let index = 1; index < task.arguments.length; index++) {
            this.buildConditionArgument(task.arguments[index]?.token);
        }
        this.processNestedArguments(task);
        let [name, ...args] = task.argumentValues();
        return `${name}(${args.join(", ")})`;
    }
}
exports.default = CallInstruction;
