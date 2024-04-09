"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapableCharacters = exports.Truthys = exports.Falsys = exports.Operators = exports.BooleanMapping = void 0;
/**
 * Maps string representations of boolean values to their corresponding boolean literals.
 */
exports.BooleanMapping = {
    false: "false",
    no: "false",
    true: "true",
    yes: "true",
};
/**
 * Set containing various operators used in expressions.
 */
exports.Operators = new Set([
    "!==",
    "!=",
    "===",
    "&&",
    "||",
    "==",
    ">=",
    "<=",
    "<",
    ">",
    "(",
    ")",
    "!",
]);
/**
 * Set containing falsy values.
 */
exports.Falsys = new Set(["False", "false", "No", "no", "0", "''", "``", '""']);
/**
 * Set containing truthy values.
 */
exports.Truthys = new Set(["True", "true", "Yes", "yes", "1"]);
/**
 * Set containing characters that can be escaped.
 */
exports.EscapableCharacters = new Set(["${", "\\", "`"]);
