"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
const logger_1 = require("./logger");
class Lexer {
    manager;
    #position = 0;
    #tokens = [];
    #path = [];
    #input = "";
    constructor(input, path = [], manager) {
        this.manager = manager;
        this.setInput(input);
        this.#path.push(...path);
    }
    get position() {
        return this.#position;
    }
    get path() {
        return this.#path.join(".");
    }
    get input() {
        return this.#input;
    }
    tokenize() {
        this.#tokens = [];
        while (!this.ended()) {
            if (this.getPreviuosChar() !== "\\" && this.getCurrentChar() === "$")
                this.tokenizeFunction();
            else
                this.advance(1);
        }
        return this.#tokens;
    }
    getPreviuosChar() {
        return this.#input[this.#position - 1] || "";
    }
    getCurrentChar() {
        return this.#input[this.#position] || "";
    }
    ended() {
        return this.#position >= this.#input.length;
    }
    parseParameters(paramString) {
        let params = [], current = "", depth = 0;
        for (let i = 1; i < paramString.length - 1; i++) {
            const char = paramString[i];
            if (char === "[") {
                current += char;
                depth++;
            }
            else if (char === "]") {
                current += char;
                depth--;
            }
            else if (char === ";" && depth === 0) {
                params.push({ value: current, nested: [] });
                current = "";
            }
            else
                current += char;
        }
        if (current.trim() !== "")
            params.push({ value: current, nested: [] });
        params = params.map(param => {
            if (param.value.includes("$")) {
                const lexer = new Lexer(param.value, this.#path, this.manager);
                param.nested = lexer.tokenize();
            }
            return param;
        });
        return params;
    }
    tokenizeFunction() {
        const start = this.#position;
        let end = start + 1;
        while (end < this.#input.length && /[A-Za-z_]/.test(this.#input[end] || "")) {
            end++;
        }
        const name = this.#input.substring(start, end);
        if (!this.manager.instructions.some(i => i.id === name || i.name === name))
            return this.advance(1);
        this.#path.push(name);
        while (end < this.#input.length && this.#input[end]?.trim() === "") {
            end++;
        }
        if (end < this.#input.length && this.#input[end] === "[") {
            const startParams = end;
            let depth = 0, escaped = false;
            while (end < this.#input.length) {
                if (this.#input[end] === "\\")
                    escaped = true;
                else if (escaped) {
                    escaped = false;
                    end++;
                }
                else if (this.#input[end] === "[")
                    depth++;
                else if (this.#input[end] === "]") {
                    depth--;
                    if (depth === 0)
                        break;
                }
                end++;
            }
            if (depth === 0) {
                const paramsString = this.substring(startParams, end + 1), parameters = this.parseParameters(paramsString);
                this.#tokens.push({
                    name,
                    total: this.substring(start, end + 1).trim(),
                    start,
                    end,
                    parameters,
                    path: this.path,
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
                total: this.substring(start, end).trim(),
                start,
                end,
                parameters: [],
                path: this.path,
            });
            this.advance(end - this.#position);
        }
        this.#path.pop();
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
// const lexer = new Lexer("$testing[$this;$get[something;second;$unreal]]");
// const tokens = lexer.tokenize();
// console.log(require("util").inspect(tokens, { depth: null }));
