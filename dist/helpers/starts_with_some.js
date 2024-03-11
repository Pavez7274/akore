"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startsWithSome = void 0;
function startsWithSome(input, index, searchStrings) {
    // Iterate over each search string in the set
    for (const op of searchStrings) {
        // Check if the input string starts with the current search string at the given index
        if (input.startsWith(op, index)) {
            // If found, return the search string
            return op;
        }
    }
    // If no operator is found, return null
    return null;
}
exports.startsWithSome = startsWithSome;
