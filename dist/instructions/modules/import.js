"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const to_valid_var_name_1 = require("../../helpers/to_valid_var_name");
const instruction_1 = require("../../classes/instruction");
class ImportInstruction extends instruction_1.Instruction {
    name = "$import";
    id = "$akoreImport";
    compile(task) {
        this.validateAndProcessArguments(task.arguments, 1, instruction_1.ArgumentTypes.NONE, instruction_1.ArgumentTypes.NONE);
        this.processNestedArguments(task);
        let [module, key = module] = task.argumentValues();
        if (key === module) {
            this.compiler.setVariable(module);
            this.compiler.setImport(module);
        }
        else if (/,/.test(key)) {
            const keys = key.split(",");
            for (let i = 0; i < keys.length; i++) {
                const e = keys[i];
                if (e) {
                    if (/ as /.test(e)) {
                        let [k, s] = e.split(" as ", 2);
                        keys[i] = (0, to_valid_var_name_1.toValidVarName)(k) + ":" + (0, to_valid_var_name_1.toValidVarName)(s);
                        this.compiler.setVariable(s);
                    }
                    this.compiler.setVariable(e);
                    keys[i] = (0, to_valid_var_name_1.toValidVarName)(e);
                }
            }
            this.compiler.setImport(module, ...keys);
            return "";
        }
        else {
            this.compiler.setVariable(module);
        }
        return (0, to_valid_var_name_1.toValidVarName)(module);
    }
}
exports.default = ImportInstruction;
