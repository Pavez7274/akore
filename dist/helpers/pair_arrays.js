"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairArrays = void 0;
function pairArrays(first, second) {
    const result = [];
    for (let i = 0; i < first.length; i++) {
        result.push([first[i], second[i]]);
    }
    return result;
}
exports.pairArrays = pairArrays;
