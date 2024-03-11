"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
class FunctionInstruction extends instruction_1.Instruction {
    name = "$function";
    id = "$akoreFunction";
    compile(task) {
        this.processNestedArguments(task);
        const [name, args, code] = task.argumentValues();
        return `function ${name}(${args}) {${code}}`;
    }
}
exports.default = FunctionInstruction;
