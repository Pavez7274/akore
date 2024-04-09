"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileNode = exports.CompiledNode = exports.Nodes = void 0;
/**
 * Namespace for defining various node types.
 */
var Nodes;
(function (Nodes) {
    Nodes.Undefined = { type: "Identifier", name: "void 0" };
    Nodes.Null = { type: "Identifier", name: "null" };
    Nodes.Var = { type: "Identifier", name: "var" };
    Nodes.Equal = { type: "Identifier", name: "=" };
    Nodes.Void = { type: "Identifier", name: "" };
})(Nodes = exports.Nodes || (exports.Nodes = {}));
/**
 * Represents a compiled node.
 */
class CompiledNode {
    code;
    constructor(code) {
        this.code = code;
    }
}
exports.CompiledNode = CompiledNode;
/**
 * Compiles a node into a CompiledNode.
 * @param node The node to compile.
 * @returns The compiled node.
 */
function compileNode(node) {
    switch (node.type) {
        case "Identifier":
            return new CompiledNode(node.name);
        case "InterpolatedString":
            return new CompiledNode(`\`${node.parts
                .map(part => part.type === "StringLiteral" || part.type === "NumberLiteral" ? part.value : `\${${compileNode(part).code}}`)
                .join("")}\``);
        case "StringLiteral":
            return new CompiledNode(`"${node.value}"`);
        case "NumberLiteral":
            return new CompiledNode(node.value.toString());
        case "Object":
            return new CompiledNode(`{ ${node.properties.map(({ key, value }) => (value ? `${key}: ${compileNode(value).code}` : key)).join(",")} }`);
        case "ExpressionStatement":
            return new CompiledNode(node.expressions.map(e => compileNode(e).code).join(", "));
        case "Line":
            return new CompiledNode(node.parts.map(p => compileNode(p).code).join(node.separator));
        case "CallExpression":
            const args = node.arguments.map(e => compileNode(e).code).join(", ");
            return new CompiledNode(`${compileNode(node.callee).code}(${args})`);
        case "Array":
            return new CompiledNode(`[${node.elements.map(e => compileNode(e).code).join(", ")}]`);
        case "ControlFlow":
            let parts = [];
            for (const part of node.parts) {
                parts.push(part.keyword);
                if (part.condition)
                    parts.push(`(${compileNode(part.condition).code})`);
                parts.push(`{\n\t${compileNode(part.body).code.replace(/\n/g, "\n\t")}\n}`);
            }
            return new CompiledNode(parts.join(" "));
        case "Program":
            return new CompiledNode(node.body
                .map(node => {
                const { code } = compileNode(node);
                return node.type === "ControlFlow" ? code : `${code};`;
            })
                .join("\n"));
        default:
            throw new Error("Unknown node type");
    }
}
exports.compileNode = compileNode;
// ? TESTING
// function printf(...r: unknown[]) {
// 	console.log(...r.map(e => require("util").inspect(e, { depth: null })));
// }
// printf(
// 	compileNode({
// 		type: "Program",
// 		body: [
// 			{
// 				type: "ControlFlow",
// 				keyword: "if",
// 				condition: [
// 					{
// 						type: "CallExpression",
// 						callee: { type: "Identifier", name: "something" },
// 						arguments: [],
// 					},
// 				],
// 				body: {
// 					type: "Program",
// 					body: [
// 						{
// 							type: "CallExpression",
// 							callee: { type: "Identifier", name: "console.log" },
// 							arguments: [{ type: "Identifier", name: "i" }],
// 						},
// 					],
// 				},
// 			},
// 		],
// 	}).code
// );
