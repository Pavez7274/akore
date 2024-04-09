"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = exports.Instruction = exports.InstructionStatus = exports.ArgumentTypes = void 0;
const helpers_1 = require("../helpers");
/**
 * @deprecated
 */
var ArgumentTypes;
(function (ArgumentTypes) {
    ArgumentTypes[ArgumentTypes["ANY"] = 0] = "ANY";
    ArgumentTypes[ArgumentTypes["TEXT"] = 1] = "TEXT";
    ArgumentTypes[ArgumentTypes["NUMBER"] = 2] = "NUMBER";
    ArgumentTypes[ArgumentTypes["REGEXP"] = 3] = "REGEXP";
    ArgumentTypes[ArgumentTypes["OBJECT"] = 4] = "OBJECT";
    ArgumentTypes[ArgumentTypes["ARRAY"] = 5] = "ARRAY";
    ArgumentTypes[ArgumentTypes["CONDITION"] = 6] = "CONDITION";
    ArgumentTypes[ArgumentTypes["NONE"] = 7] = "NONE";
})(ArgumentTypes = exports.ArgumentTypes || (exports.ArgumentTypes = {}));
var InstructionStatus;
(function (InstructionStatus) {
    InstructionStatus["Disabled"] = "DISABLED";
    InstructionStatus["Enabled"] = "ENABLED";
})(InstructionStatus = exports.InstructionStatus || (exports.InstructionStatus = {}));
class Instruction {
    compiler;
    status = "ENABLED" /* InstructionStatus.Enabled */;
    constructor(compiler) {
        this.compiler = compiler;
    }
    /**
     * Enables the instruction
     */
    enable() {
        this.status = "ENABLED" /* InstructionStatus.Enabled */;
    }
    /**
     * Disables the instruction
     */
    disable() {
        this.status = "DISABLED" /* InstructionStatus.Disabled */;
    }
}
exports.Instruction = Instruction;
class Manager {
    #instructions = [];
    get instructions() {
        return this.#instructions;
    }
    disable(...names) {
        for (const n of names) {
            const i = this.#instructions.findIndex(({ name, id }) => id === n || name === n);
            if (i !== -1)
                this.#instructions[i]?.disable();
        }
    }
    add(...instructions) {
        this.#instructions.push(...instructions);
    }
    loaddir(mod, compiler) {
        const copy = [...this.#instructions];
        for (const file of (0, helpers_1.getFiles)(mod).filter(el => el.endsWith(".js"))) {
            const imported = require(file);
            if ("default" in imported && imported.default?.prototype instanceof Instruction) {
                this.add(new imported.default(compiler));
            }
        }
        return this.#instructions !== copy;
    }
}
exports.Manager = Manager;
