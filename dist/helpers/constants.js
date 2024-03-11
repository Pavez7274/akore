"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscapableCharacters = exports.Truthys = exports.Falsys = exports.Operators = exports.BooleanMapping = void 0;
exports.BooleanMapping = {
    false: "false",
    no: "false",
    true: "true",
    yes: "true",
};
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
exports.Falsys = new Set(["False", "false", "No", "no", "0", "''", "``", '""']);
exports.Truthys = new Set(["True", "true", "Yes", "yes", "1"]);
exports.EscapableCharacters = new Set(["${", "\\", "`"]);
