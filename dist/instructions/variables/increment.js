"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../../classes/");
const instruction_1 = require("../../classes/instruction");
class $increment extends instruction_1.Instruction {
    name = "$increment";
    id = "$akoreIncrement";
    async parse({ parameters, total }) {
        if (!parameters[0])
            classes_1.Logger.error("At least one argument is required!", total);
        const parts = await Promise.all(parameters.map(this.compiler.resolveIdentifierNode));
        return classes_1.NodeFactory.line([classes_1.NodeFactory.line(parts, "."), classes_1.NodeFactory.identifier("++")], "");
    }
}
exports.default = $increment;
