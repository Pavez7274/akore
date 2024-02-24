"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicInstructions = void 0;
const tslib_1 = require("tslib");
const get_files_1 = require("./helpers/get_files");
const path_1 = require("path");
const _BasicInstructions = {};
for (const file of (0, get_files_1.getFiles)((0, path_1.join)(__dirname, "/instructions/")).filter((el) => el.endsWith(".js"))) {
    const imported = require(file).default;
    _BasicInstructions[imported.name] = imported;
}
exports.BasicInstructions = _BasicInstructions;
tslib_1.__exportStar(require("./classes/instruction"), exports);
tslib_1.__exportStar(require("./classes/compiler"), exports);
tslib_1.__exportStar(require("./classes/logger"), exports);
tslib_1.__exportStar(require("./classes/lexer"), exports);
