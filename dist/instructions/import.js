"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class ImportInstruction extends instruction_1.Instruction {
    name = "$import";
    id = "$akitaImport";
    compile(task) {
        this.processNestedArguments(task);
        let [module, name = module] = task.argValues();
        name = name.trim().replace(/[^A-z_]/g, "_");
        if (!this.compiler.vars.includes(`var ${name} = require("${module}");`)) {
            this.compiler.vars.push(`var ${name} = require("${module}");`);
        }
        return name;
    }
}
exports.default = ImportInstruction;
