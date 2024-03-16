"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
const to_valid_var_name_1 = require("../helpers/to_valid_var_name");
class GetInstruction extends instruction_1.Instruction {
    name = "$get";
    id = "$akoreGet";
    compile(task) {
        this.processNestedArguments(task);
        return task.argumentValues().map(to_valid_var_name_1.toValidVarName).join(".");
    }
}
exports.default = GetInstruction;
