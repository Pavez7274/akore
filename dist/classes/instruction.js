"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionsManager = exports.Instruction = exports.InstructionStatus = void 0;
const get_files_1 = require("../helpers/get_files");
var InstructionStatus;
(function (InstructionStatus) {
    InstructionStatus["Enabled"] = "ENABLED";
    InstructionStatus["Disabled"] = "DISABLED";
})(InstructionStatus = exports.InstructionStatus || (exports.InstructionStatus = {}));
function isOperator(input, index) {
    const operators = new Set(["!==", "!=", "===", "&&", "||", "==", ">=", "<=", "<", ">"]);
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
            else if (depth == 0 && isOperator(arg.value, i)) {
                result += this.buildStringArgument(arg, current.trim());
                console.log(char);
                if ((char === ">" || char === "<") && arg.value[i + 1] !== "=") {
                    result += char;
                }
                else {
                    console.log(char, arg.value[i + 1]);
                    result += arg.value.substring(i, i + (arg.value[i + 1] === "=" ? 3 : 2));
                    i += arg.value[i + 1] === "=" ? 1 : 0;
                }
                current = "";
            }
            else if ((depth == 0 && char === "(") || char === ")" || char === "!") {
                result += this.buildStringArgument(arg, current.trim()) + char;
                current = "";
            }
            else {
                current += char;
            }
        }
        result += this.buildStringArgument(arg, current.trim());
        return (arg.value = result);
    }
    /**
     * Builds a string argument with support for nested tokens and escape characters.
     * @param arg The token argument to build.
     * @param input Optional input string to use for building.
     * @returns The built string argument.
     */
    buildStringArgument(arg, input) {
        // Determine the value to use for building.
        const value = input || arg.value;
        // Return early if the value is empty or numeric.
        if (!value)
            return "";
        if (!isNaN(Number(value)))
            return value;
        // Check if the value is a single nested token and return it directly if so.
        if (arg.nested.length === 1 && arg.nested[0]?.total === value)
            return value;
        // Find nested tokens within the value.
        const nesteds = arg.nested
            .filter((nested) => value.includes(nested.total))
            .map((nested) => ({
            ...nested,
            start: value.indexOf(nested.total),
            end: value.indexOf(nested.total) + nested.total.length,
        }));
        // Initialize the result string.
        let result = "`";
        // Initialize variables for tracking the current nested token.
        let nestedIndex = 0;
        let actualNested = nesteds[nestedIndex];
        // Iterate over each character in the value.
        for (let i = 0; i < value.length; i++) {
            // Get the current character.
            const char = value[i];
            // If a nested token starts at the current index, replace it with its value.
            if (actualNested && actualNested.start === i) {
                result += "${" + actualNested.total + "}";
                i = actualNested.end - 1; // Skip the nested token.
                actualNested = nesteds[++nestedIndex]; // Move to the next nested token.
            }
            // If the character is a backtick or backslash, escape it.
            else if (char === "`" || char === "\\") {
                result += `\\${char}`;
            }
            // Otherwise, add the character to the result.
            else {
                result += char;
            }
        }
        // Add closing backtick to the result.
        result += "`";
        // Return the result or update the argument's value if no input was provided.
        return input ? result : (arg.value = result);
    }
    buildStringArguments(args) {
        for (const arg of args) {
            this.buildStringArgument(arg.token);
        }
    }
    buildNumberArgument(arg) {
        if (!arg)
            return "NaN";
        return isNaN(Number(arg.value)) ? (arg.value = "NaN") : arg.value;
    }
    buildNumberArguments(args) {
        for (const arg of args) {
            this.buildNumberArgument(arg.token);
        }
    }
    processNestedArgument(arg) {
        if (arg) {
            let value = arg.token.value;
            for (const nested of arg.nested) {
                if (nested) {
                    value = value.replace(nested.token.total, nested.compile());
                }
                if (value !== arg.token.value) {
                    arg.token.value = value;
                }
            }
        }
        return arg.token.value;
    }
    processNestedArguments(task) {
        for (const arg of task.arguments) {
            this.processNestedArgument(arg);
        }
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
    loaddir(mod, compiler) {
        const copy = [...this.#instructions];
        for (const file of (0, get_files_1.getFiles)(mod).filter((el) => el.endsWith(".js"))) {
            const imported = require(file);
            if ("default" in imported && imported.default?.prototype instanceof Instruction) {
                this.add(new imported.default(compiler));
            }
        }
        return this.#instructions !== copy;
    }
}
exports.InstructionsManager = InstructionsManager;
