import { Instruction, InstructionsManager } from "./instruction";
import { Lexer, Token, TokenParameter } from "./lexer";
import { Nodes } from "./nodes";
export declare class Compiler {
    program: Nodes.Program;
    readonly lexer: Lexer;
    variables: Set<string>;
    manager: InstructionsManager;
    private busy;
    constructor(manager?: InstructionsManager);
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
    resolveObjectTypeNode(_param: TokenParameter): Nodes.Object;
    resolveArrayTypeNode(_param: TokenParameter): Nodes.Array;
    resolveConditionTypeNode(param: TokenParameter): Promise<Nodes.Line>;
    resolveExpressionTypeNode(param: TokenParameter): Promise<Nodes.ExpressionStatement>;
    resolveProgramTypeNode(param: TokenParameter): Promise<Nodes.Program>;
}
