"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class VarInstruction extends instruction_1.Instruction {
    name = "$var";
    id = "$akoreVar";
    compile(task) {
        this.buildStringArgument(task.arguments[1]?.token);
        this.processNestedArguments(task);
        let [key, value] = task.argumentValues();
        if ((value && value?.startsWith("+")) || value?.startsWith("-")) {
            const operator = value.startsWith("+") ? "+" : "-";
            const numberValue = parseInt(value.slice(1), 10);
            if (!isNaN(numberValue)) {
                if (![...this.compiler.variables].some((x) => x.key === key)) {
                    this.compiler.variables.add({ key: key, value: "0" });
                }
                return `${key}${operator}=${numberValue}`;
            }
            this.compiler.addVariable(false, key.split(".")[0]);
            return `${key}${operator}=${value}`;
        }
        else {
            this.compiler.addVariable(false, key.split(".")[0]);
            return value ? `${key}=${value}` : key;
        }
    }
}
exports.default = VarInstruction;
