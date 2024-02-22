"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionsManager = exports.Instruction = exports.InstructionStatus = void 0;
const fs_1 = require("fs");
var InstructionStatus;
(function (InstructionStatus) {
    InstructionStatus["Enabled"] = "ENABLED";
    InstructionStatus["Disabled"] = "DISABLED";
})(InstructionStatus = exports.InstructionStatus || (exports.InstructionStatus = {}));
function isOperator(input, index) {
    const operators = ["!==", "!=", "===", "&&", "||", "==", ">=", "<=", "<", ">"];
    for (const op of operators) {
        if (input.startsWith(op, index)) {
            return true;
        }
    }
    return false;
}
class Instruction {
    compiler;
    status = "ENABLED" /* InstructionStatus.Enabled */;
    constructor(compiler) {
        this.compiler = compiler;
    }
    buildConditionArgument(arg) {
        if (!arg)
            return "";
        let result = "";
        let current = "";
        let depth = 0;
        for (let i = 0; i < arg.value.length; i++) {
            const char = arg.value[i];
            if (char === "[") {
                current += char;
                depth++;
            }
            else if (char === "]" && depth) {
                current += char;
                depth--;
            }
            else if (char === " " && !depth) {
                // ignore spaces
            }
            else if (isOperator(arg.value, i)) {
                result += this.buildString(current.trim(), arg);
                result += arg.value.substring(i, i + (arg.value[i + 1] === "=" ? 3 : 2));
                current = "";
                i += arg.value[i + 1] === "=" ? 2 : 1;
            }
            else if (char === "(" || char === ")" || char === "!") {
                result += this.buildString(current.trim(), arg) + char;
                current = "";
            }
            else {
                current += char;
            }
        }
        result += this.buildString(current.trim(), arg);
        return (arg.value = result);
    }
    buildStringArgument(arg) {
        if (!arg)
            return "";
        if (!isNaN(Number(arg.value)))
            return arg.value;
        if (arg.nested.length === 1 && arg.nested[0]?.total === arg.value)
            return arg.value;
        if (arg.nested.length === 0)
            return (arg.value = '"' + arg.value + '"');
        let nestedIndex = 0;
        let result = "";
        for (let i = 0; i < arg.value.length; i++) {
            const nested = arg.nested[nestedIndex];
            if (nested && nested.start === i) {
                result += "${" + nested.total + "}";
                i = nested.end - 1;
                nestedIndex++;
            }
            else {
                result += arg.value[i];
            }
        }
        return (arg.value = "`" + result + "`");
    }
    buildStringArguments(taskArgument) {
        for (const arg of taskArgument) {
            this.buildStringArgument(arg.value);
        }
    }
    processNestedArgument(arg) {
        if (arg) {
            let value = arg.value.value;
            for (const nested of arg.nested) {
                if (nested) {
                    value = value.replace(nested.token.total, nested.compile());
                }
                if (value !== arg.value.value) {
                    arg.value.value = value;
                }
            }
        }
        return arg.value.value;
    }
    processNestedArguments(task) {
        for (const arg of task.arguments) {
            this.processNestedArgument(arg);
        }
    }
    buildString(input, arg) {
        if (!isNaN(Number(input)))
            return input;
        const nesteds = arg.nested
            .filter((nested) => input.includes(nested.total))
            .map((nested) => ({
            ...nested,
            start: input.indexOf(nested.total),
            end: input.indexOf(nested.total) + nested.total.length,
        }));
        if (nesteds.length === 1 && nesteds[0]?.total.trim() === input)
            return input;
        if (nesteds.length === 0)
            return (input = '"' + input + '"');
        let result = "";
        let nestedIndex = 0;
        for (let i = 0; i < input.length; i++) {
            const nested = nesteds[nestedIndex];
            if (nested && nested.start === i) {
                result += "${" + nested.total + "}";
                i = nested.end - 1;
                nestedIndex++;
            }
            else {
                result += input[i];
            }
        }
        return (input = "`" + result + "`");
    }
    enable() {
        this.status = "ENABLED" /* InstructionStatus.Enabled */;
    }
    disable() {
        this.status = "DISABLED" /* InstructionStatus.Disabled */;
    }
}
exports.Instruction = Instruction;
class InstructionsManager {
    #instructions = [];
    get instructions() {
        return this.#instructions;
    }
    add(...instructions) {
        this.#instructions.push(...instructions);
    }
    load(mod, compiler) {
        function getFiles(mod, result = []) {
            const files = (0, fs_1.readdirSync)(mod, { withFileTypes: true });
            for (const file of files) {
                file.name = `${mod}/${file.name}`;
                file.isDirectory() ? getFiles(file.name, result) : result.push(file);
            }
            return result;
        }
        for (const file of getFiles(mod).filter((el) => el.name.endsWith(".js") || el.name.endsWith(".ts"))) {
            const imported = require(file.name);
            if ("default" in imported) {
                if (imported.default instanceof Instruction) {
                    this.add(new imported.default(compiler));
                }
            }
        }
    }
}
exports.InstructionsManager = InstructionsManager;
