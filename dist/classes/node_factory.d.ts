import { Nodes } from "./nodes";
/**
 * A factory class to create various types of AST nodes.
 */
export declare class NodeFactory {
    /**
     * Creates a StringLiteral node.
     * @param value The value of the string literal.
     * @returns The created StringLiteral node.
     */
    static stringLiteral<V extends string>(value: V): Nodes.StringLiteral<V>;
    /**
     * Creates a NumberLiteral node.
     * @param value The value of the number literal.
     * @returns The created NumberLiteral node.
     */
    static numberLiteral<V extends number>(value: V): Nodes.NumberLiteral<V>;
    /**
     * Creates an Identifier node.
     * @param name The name of the identifier.
     * @returns The created Identifier node.
     */
    static identifier<N extends string>(name: N): Nodes.Identifier<N>;
    /**
     * Creates a ControlFlow node.
     * @param keyword The keyword of the control flow statement (e.g., "if", "for").
     * @param condition The condition for the control flow statement.
     * @param body The body of the control flow statement.
     * @returns The created ControlFlow node.
     */
    static controlFlow(parts: Nodes.ControlFlow["parts"]): Nodes.ControlFlow;
    /**
     * Creates an InterpolatedString node.
     * @param parts The parts of the interpolated string.
     * @returns The created InterpolatedString node.
     */
    static interpolatedString(parts: Nodes.Node[]): Nodes.InterpolatedString;
    /**
     * Creates an ExpressionStatement node.
     * @param expression The expression of the statement.
     * @returns The created ExpressionStatement node.
     */
    static expressionStatement(expression: Nodes.Node[]): Nodes.ExpressionStatement;
    /**
     * Creates an Line node.
     * @param parts The parts of the line.
     * @returns The created Line node.
     */
    static line(parts: Nodes.Node[], separator?: string): Nodes.Line;
    /**
     * Creates a CallExpression node.
     * @param callee The callee of the expression.
     * @param args The arguments of the expression.
     * @returns The created CallExpression node.
     */
    static callExpression(callee: Nodes.Node, args: Nodes.Node[]): Nodes.CallExpression;
    /**
     * Creates a Program node.
     * @param body The body of the program.
     * @returns The created Program node.
     */
    static program(body: Nodes.Node[]): Nodes.Program;
    /**
     * Creates an Object node.
     * @param properties The properties of the object.
     * @returns The created Object node.
     */
    static object(properties: {
        key: string;
        value?: Nodes.Node;
    }[]): Nodes.Object;
    /**
     * Creates an Array node.
     * @param elements The elements of the array.
     * @returns The created Array node.
     */
    static array(elements: Nodes.Node[]): Nodes.Array;
}
