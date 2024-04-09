/**
 * Maps string representations of boolean values to their corresponding boolean literals.
 */
export declare const BooleanMapping: {
    [key: string]: "true" | "false";
};
/**
 * Set containing various operators used in expressions.
 */
export declare const Operators: Set<"!==" | "!=" | "===" | "&&" | "||" | "==" | ">=" | "<=" | "<" | ">" | "(" | ")" | "!">;
/**
 * Set containing falsy values.
 */
export declare const Falsys: Set<string>;
/**
 * Set containing truthy values.
 */
export declare const Truthys: Set<string>;
/**
 * Set containing characters that can be escaped.
 */
export declare const EscapableCharacters: Set<string>;
