"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
const logger_1 = require("./logger");
class Lexer {
    #position = 0;
    #tokens = [];
    #input = "";
    constructor(input) {
        this.setInput(input);
    }
    get position() {
        return this.#position;
    }
    get input() {
        return this.#input;
    }
    tokenize() {
        this.#tokens = [];
        while (this.#position < this.#input.length) {
            const currentChar = this.getCurrentChar();
            if (currentChar === "$") {
                this.tokenizeFunction();
            }
            else {
                this.advance(1);
            }
        }
        return this.#tokens;
    }
    getCurrentChar() {
        return this.#input[this.#position] || "";
    }
    ended() {
        return this.#position >= this.#input.length;
    }
    parseArguments(argumentString) {
        let args = [];
        let currentArgument = "";
        let depth = 0;
        for (let i = 1; i < argumentString.length - 1; i++) {
            const char = argumentString[i];
            if (char === "[") {
                currentArgument += char;
                depth++;
            }
            else if (char === "]") {
                currentArgument += char;
                depth--;
            }
            else if (char === ";" && depth === 0) {
                args.push({ value: currentArgument, nested: [] });
                currentArgument = "";
            }
            else {
                currentArgument += char;
            }
        }
        if (currentArgument.trim() !== "") {
            args.push({ value: currentArgument, nested: [] });
        }
        args = args.map((arg) => {
            if (arg.value.includes("$")) {
                const lexer = new Lexer(arg.value);
                arg.nested = lexer.tokenize();
            }
            return arg;
        });
        return args;
    }
    tokenizeFunction() {
        const start = this.#position;
        let end = start + 1;
        while (end < this.#input.length && /[A-Za-z_]/.test(this.#input[end] || "")) {
            end++;
        }
        const name = this.#input.substring(start, end);
        while (end < this.#input.length && this.#input[end]?.trim() === "") {
            end++;
        }
        if (end < this.#input.length && this.#input[end] === "[") {
            const startArgs = end;
            let depth = 0;
            while (end < this.#input.length) {
                if (this.#input[end] === "[") {
                    depth++;
                }
                else if (this.#input[end] === "]") {
                    depth--;
                    if (depth === 0) {
                        break;
                    }
                }
                end++;
            }
            if (depth === 0) {
                const argsString = this.#input.substring(startArgs, end + 1);
                const args = this.parseArguments(argsString);
                this.#tokens.push({
                    name,
                    total: this.#input.substring(start, end + 1).trim(),
                    start,
                    end,
                    arguments: args,
                });
                this.advance(end - this.#position + 1);
            }
            else {
                logger_1.Logger.error(`Instruction "${name}" does not close correctly`, "Lexer");
            }
        }
        else {
            this.#tokens.push({
                name,
                total: this.#input.substring(start, end).trim(),
                start,
                end,
                arguments: [],
            });
            this.advance(end - this.#position);
        }
    }
    setInput(input) {
        this.#input = input;
        this.#position = 0;
    }
    advance(steps) {
        this.#position += steps;
    }
    retract(steps) {
        this.#position -= steps;
    }
    substring(start, end) {
        return this.#input.substring(start, end);
    }
}
exports.Lexer = Lexer;
// ? TEST
// const lexer = new Lexer("$testing[$this;$get[something;second;$unreal]");
// const tokens = lexer.tokenize();
// console.log(require("util").inspect(tokens, { depth: null }));
