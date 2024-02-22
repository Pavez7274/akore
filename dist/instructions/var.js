"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../classes/instruction");
class VarInstruction extends instruction_1.Instruction {
    name = "$var";
    id = "$akitaVar";
    compile(task) {
        this.buildStringArgument(task.arguments[1]?.value);
        this.processNestedArguments(task);
        let [name, value] = task.argValues();
        if ((value && value?.startsWith("+")) || value?.startsWith("-")) {
            const operator = value.startsWith("+") ? "+" : "-";
            const numberValue = parseInt(value.slice(1), 10);
            if (!isNaN(numberValue)) {
                return `${name} ${operator}= ${numberValue}`;
            }
            return `${name} ${operator}= ${value}`;
        }
        else {
            if (!this.compiler.output.includes(`var ${name};`)) {
                this.compiler.prependToOutput(`var ${name};`);
            }
            return value ? `${name} = ${value}` : name;
        }
    }
}
exports.default = VarInstruction;
