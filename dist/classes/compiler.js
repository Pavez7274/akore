"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = exports.Task = void 0;
const uglify_js_1 = require("uglify-js");
const instruction_1 = require("./instruction");
const lexer_1 = require("./lexer");
const logger_1 = require("./logger");
class Task {
    token;
    instruction;
    compiler;
    arguments = [];
    constructor(token, instruction, compiler) {
        this.token = token;
        this.instruction = instruction;
        this.compiler = compiler;
        for (let i = 0; i < token.arguments.length; i++) {
            const arg = token.arguments[i];
            if (arg) {
                if (arg.nested.length > 0) {
                    this.arguments[i] = {
                        value: arg,
                        nested: compiler.createTasksFromTokens(arg.nested),
                    };
                }
                else {
                    this.arguments[i] = {
                        value: arg,
                        nested: [],
                    };
                }
            }
        }
    }
    argValues() {
        return this.arguments.map((arg) => arg.value.value);
    }
    compile() {
        return this.instruction.compile(this);
    }
}
exports.Task = Task;
class Compiler {
    instructionsManager;
    lexer = new lexer_1.Lexer("");
    busy = false;
    #output = "";
    #input = "";
    constructor(input, instructionsManager = new instruction_1.InstructionsManager()) {
        this.instructionsManager = instructionsManager;
        this.lexer.setInput(input);
        this.#input = input;
    }
    get output() {
        return this.#output;
    }
    get input() {
        return this.#input;
    }
    createTasksFromTokens(tokens) {
        const tasks = [];
        for (const token of tokens) {
            const instruction = this.findInstructionForToken(token);
            if (instruction) {
                tasks.push(new Task(token, instruction, this));
            }
        }
        return tasks;
    }
    findInstructionForToken(token) {
        return this.instructionsManager.instructions.find((instruction) => instruction.name === token.name);
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
    compile() {
        if (this.busy) {
            logger_1.Logger.warn("The compiler is busy!", "Compiler");
            return;
        }
        this.busy = true;
        const tasks = this.createTasksFromTokens(this.lexer.tokenize());
        // console.log(require("util").inspect(tasks, { depth: null }));
        for (const task of tasks) {
            this.appendToOutput(task.compile() + ";\n");
        }
        return (0, uglify_js_1.minify)(this.#output).code;
    }
}
exports.Compiler = Compiler;
