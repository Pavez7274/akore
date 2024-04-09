"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes");
const instruction_1 = require("../../classes/instruction");
class $while extends instruction_1.Instruction {
    name = "$while";
    id = "$akoreWhile";
    async parse({ parameters }) {
        return classes_1.NodeFactory.controlFlow([
            {
                keyword: "while",
                condition: await this.compiler.resolveConditionTypeNode(parameters[0]),
                body: await this.compiler.resolveProgramTypeNode(parameters[1]),
            },
        ]);
    }
}
exports.default = $while;
