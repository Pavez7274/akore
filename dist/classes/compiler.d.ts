import { Instruction, Manager } from "./instruction";
import { Lexer, Token, TokenParameter } from "./lexer";
import { Nodes } from "./nodes";
export declare class Compiler {
    manager: Manager;
    program: Nodes.Program;
    variables: Set<string>;
    readonly lexer: Lexer;
    private busy;
    constructor(manager?: Manager);
    get input(): string;
    isBusy(): boolean;
    /**
     * Sets the input code for compilation.
     * @param input The input code to set.
     * @returns The Compiler instance for method chaining.
     */
    setInput(input: string): this;
    findInstructionForToken(token: Token): Instruction | undefined;
    parseToken(token: Token): Promise<Nodes.Node>;
    /**
     * Compiles the input code.
     * @param debug Indicates whether debug mode is enabled.
     * @returns The compiled code, or void if an error occurred.
     */
    compile(debug?: boolean): Promise<string | void>;
    resolveIdentifierNode(param: TokenParameter): Promise<Nodes.Identifier<string>>;
    resolveStringLiteralNode(param: TokenParameter): Promise<Nodes.StringLiteral<string>>;
    resolveStringTypeNode(param: TokenParameter): Promise<Nodes.AnyString>;
    resolveAnyOrStringNode(param: TokenParameter): Promise<Nodes.ExpressionStatement | Nodes.CallExpression | Nodes.InterpolatedString | Nodes.StringLiteral<string> | Nodes.NumberLiteral<number> | Nodes.ControlFlow | Nodes.Identifier<string> | Nodes.Program | Nodes.Object | Nodes.Array | Nodes.Line>;
    resolveNumberTypeNode(param: TokenParameter): Promise<Nodes.NumberLiteral>;
    resolveRegexpTypeNode(param: TokenParameter): Promise<Nodes.Node | null>;
    /**
     * This doesn't works!!
     */
    resolveObjectTypeNode(_param: TokenParameter): Nodes.Object;
    /**
     * This doesn't works!!
     */
    resolveArrayTypeNode(_param: TokenParameter): Nodes.Array;
    resolveConditionTypeNode(param: TokenParameter): Promise<Nodes.Line>;
    resolveExpressionTypeNode(param: TokenParameter): Promise<Nodes.ExpressionStatement>;
    resolveProgramTypeNode(param: TokenParameter): Promise<Nodes.Program>;
}
