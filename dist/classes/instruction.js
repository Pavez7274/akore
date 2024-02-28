"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructionsManager = exports.Instruction = exports.InstructionStatus = void 0;
const get_files_1 = require("../helpers/get_files");
var InstructionStatus;
(function (InstructionStatus) {
    InstructionStatus["Enabled"] = "ENABLED";
    InstructionStatus["Disabled"] = "DISABLED";
})(InstructionStatus = exports.InstructionStatus || (exports.InstructionStatus = {}));
/**
 * Finds and returns an operator from the given input string at the specified index.
 *
 * @param {string} input The input string to search for operators.
 * @param {number} index The index in the input string to start searching from.
 * @returns {string | null} The operator found at the specified index, or null if not found.
 */
function findOperator(input, index) {
    // Define the set of operators
    const operators = new Set([
        "!==",
        "!=",
        "===",
        "&&",
        "||",
        "==",
        ">=",
        "<=",
        "<",
        ">",
        "(",
        ")",
        "!",
    ]);
    // Iterate over each operator in the set
    for (const op of operators) {
        // Check if the input string starts with the current operator at the given index
        if (input.startsWith(op, index)) {
            // If found, return the operator
            return op;
        }
    }
    // If no operator is found, return null
    return null;
}
class Instruction {
    compiler;
    status = "ENABLED" /* InstructionStatus.Enabled */;
    constructor(compiler) {
        this.compiler = compiler;
    }
    /**
     * Builds a condition argument by parsing and processing tokens.
     * @param {TokenArgument} arg The token argument to process.
     * @returns {string} The processed condition argument.
     */
    buildConditionArgument(arg) {
        if (!arg)
            return "";
        let result = "";
        let current = "";
        let depth = 0;
        for (let i = 0; i < arg.value.length; i++) {
            const char = arg.value[i];
            const op = findOperator(arg.value, i);
            if (depth == 0 && op) {
                // If an operator is found, process the current string as a standalone argument
                result += this.buildStringArgument(arg, current.trim());
                result += op;
                console.log(result);
                i += op.length - 1 || 1; // Skip the length of the operator
                current = "";
            }
            else if (char === "[") {
                // If it's the beginning of a nested condition, increment depth
                current += char;
                depth++;
            }
            else if (char === "]" && depth) {
                // If it's the end of a nested condition, decrement depth
                current += char;
                depth--;
            }
            else if (char.trim() === "" && !depth) {
                // Ignore spaces if not within nested conditions
            }
            else {
                // Otherwise, accumulate characters to form the current argument
                current += char;
            }
        }
        // Process the remaining string as a standalone argument
        result += this.buildStringArgument(arg, current.trim());
        // Update the value of the original argument with the processed result
        return (arg.value = result);
    }
    /**
     * Builds a string argument by processing the given token argument
     * with support for nested tokens and escape characters.
     * @param arg The token argument to build.
     * @param input Optional input string to use for building.
     * @returns The built string argument.
     */
    buildStringArgument(arg, input) {
        // Determine the value to use for building.
        const value = input ?? arg.value;
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
    /**
     * Builds string arguments by processing each token in the given array of task arguments.
     * @param {TaskArgument[]} args Array of task arguments containing tokens to be processed.
     */
    buildStringArguments(args) {
        for (const arg of args) {
            this.buildStringArgument(arg.token);
        }
    }
    /**
     * Builds a number argument by processing the given token argument.
     * @param {TokenArgument | undefined} arg The token argument to be processed.
     * @returns {string} The processed number value.
     */
    buildNumberArgument(arg) {
        if (!arg)
            return "NaN";
        return isNaN(Number(arg.value)) ? (arg.value = "NaN") : arg.value;
    }
    /**
     * Builds number arguments by processing each token in the given array of task arguments.
     * @param {TaskArgument[]} args Array of task arguments containing tokens to be processed.
     */
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
