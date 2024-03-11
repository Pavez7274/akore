"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../../classes/instruction");
const hjson_1 = require("hjson");
function toJSON(i) {
    try {
        return (0, hjson_1.parse)(i);
    }
    catch {
        return null;
    }
}
class ImportInstruction extends instruction_1.Instruction {
    name = "$import";
    id = "$akoreImport";
    compile(task) {
        this.processNestedArguments(task);
        let [module, key = module] = task.argumentValues();
        const parsed = toJSON(key);
        if (parsed !== null) {
            if (Array.isArray(parsed)) {
                this.compiler.variables = new Set([...this.compiler.variables].filter((x) => !parsed.includes(x.key)));
                this.compiler.addVariable(true, `{${parsed.join(",")}}`, `require("${module}")`);
            }
            else {
                this.compiler.variables = new Set([...this.compiler.variables].filter((x) => !parsed.hasOwnProperty(x.key)));
                this.compiler.addVariable(true, `{${Object.entries(parsed)
                    .map(([k, v]) => `${k}:${v}`)
                    .join(",")}}`, `require("${module}")`);
            }
            return "";
        }
        else {
            key = key.trim().replace(/[^A-z_]/g, "_");
            this.compiler.addVariable(true, key, `require("${module}")`);
            return key;
        }
    }
}
exports.default = ImportInstruction;
