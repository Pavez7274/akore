"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class IfInstruction extends instruction_1.Instruction {
    name = "$if";
    id = "$akoreIf";
    compile(task) {
        this.validateAndProcessArguments(task.arguments, 2, instruction_1.ArgumentTypes.CONDITION, instruction_1.ArgumentTypes.NONE, instruction_1.ArgumentTypes.NONE);
        this.processNestedArguments(task);
        const [condition, whenTrue, whenFalse] = task
            .argumentValues()
            .map((el) => el.trim().replace(/\n/g, "\n\t"));
        return `if (${condition}) {\n\t${whenTrue}\n}${whenFalse ? ` else {\n\t${whenFalse}\n}` : ""}`;
    }
}
exports.default = IfInstruction;
