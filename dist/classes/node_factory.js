"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeFactory = void 0;
/**
 * A factory class to create various types of AST nodes.
 */
class NodeFactory {
    /**
     * Creates a StringLiteral node.
     * @param value The value of the string literal.
     * @returns The created StringLiteral node.
     */
    static stringLiteral(value) {
        return { type: "StringLiteral", value };
    }
    /**
     * Creates a NumberLiteral node.
     * @param value The value of the number literal.
     * @returns The created NumberLiteral node.
     */
    static numberLiteral(value) {
        return { type: "NumberLiteral", value };
    }
    /**
     * Creates an Identifier node.
     * @param name The name of the identifier.
     * @returns The created Identifier node.
     */
    static identifier(name) {
        return { type: "Identifier", name };
    }
    /**
     * Creates a ControlFlow node.
     * @param keyword The keyword of the control flow statement (e.g., "if", "for").
     * @param condition The condition for the control flow statement.
     * @param body The body of the control flow statement.
     * @returns The created ControlFlow node.
     */
    static controlFlow(parts) {
        return { type: "ControlFlow", parts };
    }
    /**
     * Creates an InterpolatedString node.
     * @param parts The parts of the interpolated string.
     * @returns The created InterpolatedString node.
     */
    static interpolatedString(parts) {
        return { type: "InterpolatedString", parts };
    }
    /**
     * Creates an ExpressionStatement node.
     * @param expression The expression of the statement.
     * @returns The created ExpressionStatement node.
     */
    static expressionStatement(expression) {
        return { type: "ExpressionStatement", expressions: expression };
    }
    /**
     * Creates an Line node.
     * @param parts The parts of the line.
     * @returns The created Line node.
     */
    static line(parts, separator = " ") {
        return { type: "Line", parts, separator };
    }
    /**
     * Creates a CallExpression node.
     * @param callee The callee of the expression.
     * @param args The arguments of the expression.
     * @returns The created CallExpression node.
     */
    static callExpression(callee, args) {
        return { type: "CallExpression", callee, arguments: args };
    }
    /**
     * Creates a Program node.
     * @param body The body of the program.
     * @returns The created Program node.
     */
    static program(body) {
        return { type: "Program", body };
    }
    /**
     * Creates an Object node.
     * @param properties The properties of the object.
     * @returns The created Object node.
     */
    static object(properties) {
        return { type: "Object", properties };
    }
    /**
     * Creates an Array node.
     * @param elements The elements of the array.
     * @returns The created Array node.
     */
    static array(elements) {
        return { type: "Array", elements };
    }
}
exports.NodeFactory = NodeFactory;
