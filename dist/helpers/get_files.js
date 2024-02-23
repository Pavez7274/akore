"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function getFiles(mod) {
    let result = [];
    const entries = (0, fs_1.readdirSync)(mod, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = (0, path_1.join)(mod, entry.name);
        if (entry.isDirectory()) {
            result = result.concat(getFiles(fullPath));
        }
        else {
            result.push(fullPath);
        }
    }
    return result;
}
exports.getFiles = getFiles;
