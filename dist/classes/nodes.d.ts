/**
 * Namespace for defining various node types.
 */
export declare namespace Nodes {
    interface ControlFlowPart {
        keyword: string;
        condition?: Node;
        body: Node;
    }
    type ControlFlow = {
        type: "ControlFlow";
        parts: ControlFlowPart[];
    };
    type StringLiteral<Value extends string = string> = {
        type: "StringLiteral";
        value: Value;
    };
    type InterpolatedString = {
        type: "InterpolatedString";
        parts: Node[];
    };
    type EmptyString = StringLiteral<"">;
    type String = InterpolatedString | StringLiteral | EmptyString;
    type ExpressionStatement = {
        type: "ExpressionStatement";
        expressions: Node[];
    };
    type Line = {
        type: "Line";
        parts: Node[];
        separator: string;
    };
    type CallExpression = {
        type: "CallExpression";
        callee: Node;
        arguments: Node[];
    };
    type Identifier<Name extends string = string> = {
        type: "Identifier";
        name: Name;
    };
    type NumberLiteral<Value extends number = number> = {
        type: "NumberLiteral";
        value: Value;
    };
    type Program = {
        type: "Program";
        body: Node[];
    };
    type Object = {
        type: "Object";
        properties: {
            key: string;
            value?: Node;
        }[];
    };
    type Array = {
        type: "Array";
        elements: Node[];
    };
    type Node = ExpressionStatement | CallExpression | InterpolatedString | StringLiteral | NumberLiteral | ControlFlow | Identifier | Program | Object | Array | Line;
    type AnyString = InterpolatedString | StringLiteral;
    const Undefined: Identifier<"void 0">;
    const Null: Identifier<"null">;
    const Var: Identifier<"var">;
    const Equal: Identifier<"=">;
    const Void: Identifier<"">;
}
/**
 * Represents a compiled node.
 */
export declare class CompiledNode {
    readonly code: string;
    constructor(code: string);
}
/**
 * Compiles a node into a CompiledNode.
 * @param node The node to compile.
 * @returns The compiled node.
 */
export declare function compileNode(node: Nodes.Node): CompiledNode;
