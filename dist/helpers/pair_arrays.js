"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairArrays = void 0;
/**
 * Pair two arrays into an array of tuples, where each tuple contains an element from the first array
 * paired with the corresponding element from the second array, or undefined if the second array is shorter.
 * @param {Array<unknown>} first - The first array.
 * @param {Array<unknown>} second - The second array.
 * @returns {Array<[F, S | undefined]>} An array of tuples containing pairs of elements from the two arrays.
 * The second element of each tuple may be undefined if the second array is shorter than the first array.
 * @template F - The type of elements in the first array.
 * @template S - The type of elements in the second array.
 */
function pairArrays(first, second) {
    const result = [];
    for (let i = 0; i < first.length; i++) {
        result.push([first[i], second[i]]);
    }
    return result;
}
exports.pairArrays = pairArrays;
