"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Recursively get all files in a directory and its subdirectories.
 * @param {string} mod - The path of the directory to search.
 * @returns {string[]} An array containing the paths of all files found in the directory and its subdirectories.
 */
function getFiles(mod) {
    const entries = (0, fs_1.readdirSync)(mod, { withFileTypes: true });
    let result = [];
    for (const entry of entries) {
        const fullPath = (0, path_1.join)(mod, entry.name);
        if (entry.isDirectory()) {
            // Recursively get files in subdirectories
            result = result.concat(getFiles(fullPath));
        }
        else {
            // Add file path to result array
            result.push(fullPath);
        }
    }
    return result;
}
exports.getFiles = getFiles;
