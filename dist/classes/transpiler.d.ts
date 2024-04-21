import { Instruction, Manager } from "./instruction";
import { Lexer, Token, TokenParameter } from "./lexer";
import { Nodes } from "./nodes";
/**
 * The `Transpiler` class is responsible for compiling input code into an abstract syntax tree (AST).
 * It provides methods for setting the input code, parsing tokens, and compiling the program.
 */
export declare class Transpiler {
    manager: Manager;
    program: Nodes.Program;
    variables: Set<string>;
    readonly lexer: Lexer;
    private busy;
    constructor(manager?: Manager);
    /**
     * Gets the input string used by the Transpiler.
     */
    get input(): string;
    /**
     * Checks if the Transpiler is currently busy.
     * @returns `true` if the Transpiler is busy, `false` otherwise.
     */
    isBusy(): boolean;
    /**
     * Sets the input for the Transpiler.
     * @param input The input string to be set.
     * @returns The instance of the Transpiler.
     */
    setInput(input: string): this;
    /**
     * Finds an instruction for the given token.
     * @param token - The token to find an instruction for.
     * @returns The instruction associated with the token, if found. Otherwise, undefined.
     */
    instructionForToken(token: Token): Instruction | undefined;
    /**
     * Parses a token and returns the corresponding node.
     * If an instruction is found for the token and it is enabled, the token is parsed using the instruction.
     * Otherwise, it returns a Null node.
     * @param token - The token to parse.
     * @returns A Promise that resolves to the parsed node.
     */
    parseToken(token: Token): Promise<Nodes.Node>;
    /**
     * Transpiles the input code into executable code.
     * @param debug - Whether to enable debug mode.
     * @returns The transpiled code.
     */
    transpile(debug?: boolean): Promise<string | void>;
    /**
     * Resolves an Identifier node based on the given TokenParameter.
     * @param param - The TokenParameter containing the value and nested tokens.
     * @returns The resolved Identifier node.
     */
    resolveIdentifierNode(param: TokenParameter): Promise<Nodes.Identifier<string>>;
    /**
     * Resolves a string literal node based on the provided token parameter.
     * @param param - The token parameter containing the value and nested tokens.
     * @returns The resolved string literal node.
     */
    resolveStringLiteralnode(param: TokenParameter): Promise<Nodes.StringLiteral<string>>;
    /**
     * Resolves a string type node based on the provided token parameter.
     * If there are no nested tokens, it resolves to a StringLiteral node with the value as is.
     * If there is a single nested token and its total value is equal to the value of the argument, that token is resolved.
     * If none of the above options are true, an InterpolatedString is created.
     * @param param The token parameter to resolve.
     * @returns A promise that resolves to an AnyString node.
     */
    resolveStringTypeNode(param: TokenParameter): Promise<Nodes.AnyString>;
    /**
     * Resolves a TokenParameter to a node that can be either a number literal or a string type node.
     * If the TokenParameter value is a valid number, it returns a number literal node.
     * If the TokenParameter value is a string, it resolves the string type node.
     * If the resolved node is an interpolated string with a single part, it returns that part.
     * If the resolved node is an interpolated string with multiple parts, it returns the entire node.
     * If the resolved node is not an interpolated string, it returns the node as is.
     * @param param - The TokenParameter to resolve.
     * @returns The resolved node.
     */
    resolveAnyOrStringNode(param: TokenParameter): Promise<Nodes.ExpressionStatement | Nodes.CallExpression | Nodes.InterpolatedString | Nodes.StringLiteral<string> | Nodes.NumberLiteral<number> | Nodes.ControlFlow | Nodes.Identifier<string> | Nodes.Program | Nodes.Object | Nodes.Array | Nodes.Line>;
    /**
     * Resolves a number type node.
     * @param param - The TokenParameter to resolve.
     * @returns A promise that resolves to a NumberLiteral node.
     */
    resolveNumberTypeNode(param: TokenParameter): Promise<Nodes.NumberLiteral>;
    /**
     * Resolves a regular expression type node.
     * @param param - The TokenParameter to resolve.
     * @returns A promise that resolves to a node representing the regular expression, or null if the resolution fails.
     */
    resolveRegexpTypeNode(param: TokenParameter): Promise<Nodes.CallExpression>;
    /**
     * Resolves an object type node based on the provided token parameter.
     * If the token parameter value can be parsed as an object, it returns an object node.
     * Otherwise, it returns an empty object node.
     * @param param - The TokenParameter to resolve.
     * @returns The resolved object node.
     */
    resolveObjectTypeNode(param: TokenParameter): Promise<Nodes.Object | typeof Nodes.Null>;
    /**
     * This doesn't works yet.
     */
    resolveArrayTypeNode(_param: TokenParameter): Nodes.Array;
    resolveConditionTypeNode(param: TokenParameter): Promise<Nodes.Line>;
    resolveExpressionTypeNode(param: TokenParameter): Promise<Nodes.ExpressionStatement>;
    resolveProgramTypeNode(param: TokenParameter): Promise<Nodes.Program>;
}
export interface ObjectPair {
    key: string;
    value: string;
}
/**
 * The `ObjectTranspiler` class is responsible for transpiling a string representation of an object into an array of key-value pairs.
 */
export declare class ObjectTranspiler {
    /**
     * Transpiles a string representation of an object into an array of key-value pairs.
     * @param input The input string to be transpiled.
     * @returns An array of key-value pairs.
     * @example
     * ObjectTranspiler.transpile('key1="value1";key2="value2";');
     * // [{ key: 'key1', value: 'value1' }, { key: 'key2', value: 'value2' }]
     */
    static transpile(input: string): ObjectPair[];
}
