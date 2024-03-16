"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class VarInstruction extends instruction_1.Instruction {
    name = "$var";
    id = "$akoreVar";
    compile(task) {
        this.buildStringArgument(task.arguments[1]?.token);
        this.processNestedArguments(task);
        const [key, value] = task.argumentValues();
        this.compiler.setVariable(key.split(".")[0]);
        return value ? `${key} = ${value}` : key;
    }
}
exports.default = VarInstruction;
