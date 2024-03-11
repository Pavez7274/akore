"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = exports.Task = void 0;
const uglify_js_1 = require("uglify-js");
const instruction_1 = require("./instruction");
const lexer_1 = require("./lexer");
const logger_1 = require("./logger");
/**
 * Represents a compilation task.
 */
class Task {
    token;
    instruction;
    compiler;
    arguments = [];
    /**
     * Creates an instance of Task.
     * @param token The token associated with the task.
     * @param instruction The instruction associated with the task.
     * @param compiler The compiler instance.
     */
    constructor(token, instruction, compiler) {
        this.token = token;
        this.instruction = instruction;
        this.compiler = compiler;
        for (let i = 0; i < token.arguments.length; i++) {
            const arg = token.arguments[i];
            if (arg) {
                if (arg.nested.length > 0) {
                    this.arguments[i] = {
                        token: arg,
                        nested: compiler.createTasksFromTokens(arg.nested),
                    };
                }
                else {
                    this.arguments[i] = {
                        token: arg,
                        nested: [],
                    };
                }
            }
        }
    }
    /**
     * Retrieves the values of the arguments in the task.
     * @returns An array of argument values.
     */
    argumentValues() {
        return this.arguments.map((arg) => arg.token.value);
    }
    /**
     * Compiles the task.
     * @returns The compiled code for the task.
     */
    compile() {
        return this.instruction.compile(this);
    }
}
exports.Task = Task;
class Compiler {
    instructionsManager;
    lexer = new lexer_1.Lexer("");
    busy = false;
    variables = new Set();
    #output = "";
    #input = "";
    /**
     * Creates an instance of Compiler.
     * @param input The input code to compile.
     * @param instructionsManager The instructions manager instance.
     */
    constructor(input = "", instructionsManager = new instruction_1.InstructionsManager()) {
        this.instructionsManager = instructionsManager;
        this.lexer.setInput(input);
        this.#input = input;
    }
    /**
     * Retrieves the compiled output.
     */
    get output() {
        return this.#output;
    }
    /**
     * Retrieves the input code.
     */
    get input() {
        return this.#input;
    }
    /**
     * Sets the input code for compilation.
     * @param input The input code to set.
     * @returns The Compiler instance for method chaining.
     */
    setInput(input) {
        if (this.busy) {
            logger_1.Logger.warn("The compiler is already busy!", "Compiler.setInput");
        }
        else {
            this.lexer.setInput((this.#input = input));
        }
        return this;
    }
    createTasksFromTokens(tokens) {
        const tasks = [];
        for (const token of tokens) {
            const instruction = this.findInstructionForToken(token);
            if (instruction && instruction.status === "ENABLED" /* InstructionStatus.Enabled */) {
                tasks.push(new Task(token, instruction, this));
            }
        }
        return tasks;
    }
    findInstructionForToken(token) {
        return this.instructionsManager.instructions.find((instruction) => instruction.id === token.name || instruction.name === token.name);
    }
    appendToOutput(value) {
        this.#output += value;
    }
    prependToOutput(value) {
        this.#output = value + this.#output;
    }
    insertAtLine(lineNumber, value) {
        const lines = this.#output.split("\n");
        if (lineNumber >= 0 && lineNumber < lines.length) {
            lines[lineNumber] += value;
            this.#output = lines.join("\n");
        }
    }
    insertAtPosition(position, value) {
        if (position >= 0 && position <= this.#output.length) {
            this.#output = this.#output.slice(0, position) + value + this.#output.slice(position);
        }
    }
    /**
     * Compiles the input code.
     * @param debug Indicates whether debug mode is enabled.
     * @returns The compiled code, or void if an error occurred.
     */
    async compile(debug = false, minifyOutput = false) {
        if (this.busy) {
            logger_1.Logger.warn("The compiler is already busy!", "Compiler.compile");
            return;
        }
        const start = Date.now();
        this.busy = true;
        if (debug) {
            logger_1.Logger.debug("Compiler set to busy", "Compiler");
        }
        // Create tasks from tokens
        const tasks = this.createTasksFromTokens(this.lexer.tokenize());
        if (debug) {
            logger_1.Logger.debug(`Tasks created: ${tasks.length}`, "Compiler.compile");
        }
        // Compile tasks
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            if (debug) {
                logger_1.Logger.debug(`Compiling task ${i + 1} of ${tasks.length}: ${task.token.total}`, "Compiler.compile");
            }
            try {
                const compiled = task.compile();
                if (debug) {
                    logger_1.Logger.debug(`Task ${i + 1} compiled successfully:\n${compiled}`, "Compiler.compile");
                }
                this.appendToOutput(compiled + ";\n");
            }
            catch (error) {
                logger_1.Logger.error(`Error compiling task ${i + 1}: ${error.message}`, "Compiler.compile");
            }
        }
        // Minify the output
        this.#output = `var ${Array.from(this.variables)
            .map((x) => (x.value ? `${x.key}=${x.value}` : x.key))
            .join(", ")};${this.#output}`;
        const code = minifyOutput
            ? (0, uglify_js_1.minify)(this.#output, { output: { beautify: true } }).code
            : this.#output;
        if (debug) {
            logger_1.Logger.debug(`Compilation completed in ${Date.now() - start} miliseconds.\nInput code:\n${this.#input}\nOutput code:\n${code}`, "Compiler.compile");
        }
        // Clear data
        this.variables.clear();
        this.#output = "";
        if (debug) {
            logger_1.Logger.debug("Data was cleared", "Compiler.compile");
        }
        this.busy = false;
        if (debug) {
            logger_1.Logger.debug("Compiler set to idle", "Compiler.compile");
        }
        return code;
    }
    addVariable(priority, key, value) {
        if (priority) {
            this.variables = new Set([...this.variables].filter((x) => x.key !== key));
        }
        this.variables.add({ key, value });
    }
    addInstruction(...instructions) {
        this.instructionsManager.add(...instructions);
    }
    /**
     * Loads instructions from the specified directory.
     * @param path The directory path containing instruction files.
     * @returns True if the instructions were loaded successfully, otherwise false.
     */
    loaddir(path) {
        return this.instructionsManager.loaddir(path, this);
    }
    disableInstructions(...names) {
        for (const name of names) {
            const index = this.instructionsManager.instructions.findIndex((instruction) => instruction.id === name || instruction.name === name);
            if (index !== -1) {
                this.instructionsManager.instructions[index]?.disable();
            }
        }
    }
    enableInstructions(...names) {
        for (const name of names) {
            const index = this.instructionsManager.instructions.findIndex((instruction) => instruction.id === name || instruction.name === name);
            if (index !== -1) {
                this.instructionsManager.instructions[index]?.enable();
            }
        }
    }
}
exports.Compiler = Compiler;
