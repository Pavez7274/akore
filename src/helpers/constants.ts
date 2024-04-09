/**
 * Maps string representations of boolean values to their corresponding boolean literals.
 */
export const BooleanMapping: { [key: string]: "true" | "false" } = {
    false: "false",
    no: "false",
    true: "true",
    yes: "true",
};

/**
 * Set containing various operators used in expressions.
 */
export const Operators = new Set([
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
] as const);

/**
 * Set containing falsy values.
 */
export const Falsys = new Set(["False", "false", "No", "no", "0", "''", "``", '""']);

/**
 * Set containing truthy values.
 */
export const Truthys = new Set(["True", "true", "Yes", "yes", "1"]);

/**
 * Set containing characters that can be escaped.
 */
export const EscapableCharacters = new Set(["${", "\\", "`"]);
