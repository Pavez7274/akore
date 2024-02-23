"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicInstructions = void 0;
const tslib_1 = require("tslib");
const function_1 = tslib_1.__importDefault(require("./instructions/function"));
const import_1 = tslib_1.__importDefault(require("./instructions/import"));
const export_1 = tslib_1.__importDefault(require("./instructions/export"));
const print_1 = tslib_1.__importDefault(require("./instructions/print"));
const while_1 = tslib_1.__importDefault(require("./instructions/while"));
const null_1 = tslib_1.__importDefault(require("./instructions/null"));
const get_1 = tslib_1.__importDefault(require("./instructions/get"));
const sum_1 = tslib_1.__importDefault(require("./instructions/sum"));
const var_1 = tslib_1.__importDefault(require("./instructions/var"));
const if_1 = tslib_1.__importDefault(require("./instructions/if"));
exports.BasicInstructions = {
    FunctionInstruction: function_1.default,
    ImportInstruction: import_1.default,
    ExportInstruction: export_1.default,
    PrintInstruction: print_1.default,
    WhileInstruction: while_1.default,
    NullInstruction: null_1.default,
    GetInstruction: get_1.default,
    SumInstruction: sum_1.default,
    VarInstruction: var_1.default,
    IfInstruction: if_1.default,
};
tslib_1.__exportStar(require("./classes/instruction"), exports);
tslib_1.__exportStar(require("./classes/compiler"), exports);
tslib_1.__exportStar(require("./classes/logger"), exports);
tslib_1.__exportStar(require("./classes/lexer"), exports);
