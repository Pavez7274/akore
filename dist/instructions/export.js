"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class ExportInstruction extends instruction_1.Instruction {
    name = "$export";
    id = "$akitaExport";
    compile(task) {
        this.processNestedArguments(task);
        const [name, value] = task.argValues();
        return `exports${name ? `.${name}` : ""} = ${value}`;
    }
}
exports.default = ExportInstruction;
