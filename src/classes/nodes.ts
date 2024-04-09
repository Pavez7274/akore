/**
 * Namespace for defining various node types.
 */
export namespace Nodes {
	export interface ControlFlowPart {
		keyword: string;
		condition?: Node;
		body: Node;
	}

	export type ControlFlow = {
		type: "ControlFlow";
		parts: ControlFlowPart[];
	};

	export type StringLiteral<Value extends string = string> = {
		type: "StringLiteral";
		value: Value;
	};
	export type InterpolatedString = {
		type: "InterpolatedString";
		parts: Node[];
	};
	export type EmptyString = StringLiteral<"">;
	export type String = InterpolatedString | StringLiteral | EmptyString;

	export type ExpressionStatement = {
		type: "ExpressionStatement";
		expressions: Node[];
	};

	export type Line = {
		type: "Line";
		parts: Node[];
		separator: string;
	};

	export type CallExpression = {
		type: "CallExpression";
		callee: Node;
		arguments: Node[];
	};

	export type Identifier<Name extends string = string> = { type: "Identifier"; name: Name };

	export type NumberLiteral<Value extends number = number> = {
		type: "NumberLiteral";
		value: Value;
	};

	export type Program = { type: "Program"; body: Node[] };

	export type Object = { type: "Object"; properties: { key: string; value?: Node }[] };

	export type Array = { type: "Array"; elements: Node[] };

	// Define a union type for all possible node types
	export type Node =
		| ExpressionStatement
		| CallExpression
		| InterpolatedString
		| StringLiteral
		| NumberLiteral
		| ControlFlow
		| Identifier
		| Program
		| Object
		| Array
		| Line;

	export type AnyString = InterpolatedString | StringLiteral;

	export const Undefined: Identifier<"void 0"> = { type: "Identifier", name: "void 0" };
	export const Null: Identifier<"null"> = { type: "Identifier", name: "null" };
	export const Var: Identifier<"var"> = { type: "Identifier", name: "var" };
	export const Equal: Identifier<"="> = { type: "Identifier", name: "=" };
	export const Void: Identifier<""> = { type: "Identifier", name: "" };
}

/**
 * Represents a compiled node.
 */
export class CompiledNode {
	constructor(public readonly code: string) {}
}

/**
 * Compiles a node into a CompiledNode.
 * @param node The node to compile.
 * @returns The compiled node.
 */
export function compileNode(node: Nodes.Node): CompiledNode {
	switch (node.type) {
		case "Identifier":
			return new CompiledNode(node.name);

		case "InterpolatedString":
			return new CompiledNode(
				`\`${node.parts
					.map(part =>
						part.type === "StringLiteral" || part.type === "NumberLiteral" ? part.value : `\${${compileNode(part).code}}`,
					)
					.join("")}\``,
			);

		case "StringLiteral":
			return new CompiledNode(`"${node.value}"`);

		case "NumberLiteral":
			return new CompiledNode(node.value.toString());

		case "Object":
			return new CompiledNode(
				`{ ${node.properties.map(({ key, value }) => (value ? `${key}: ${compileNode(value).code}` : key)).join(",")} }`,
			);

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
			let parts: string[] = [];

			for (const part of node.parts) {
				parts.push(part.keyword);
				if (part.condition) parts.push(`(${compileNode(part.condition).code})`);
				parts.push(`{\n\t${compileNode(part.body).code.replace(/\n/g, "\n\t")}\n}`);
			}

			return new CompiledNode(parts.join(" "));

		case "Program":
			return new CompiledNode(
				node.body
					.map(node => {
						const { code } = compileNode(node);
						return node.type === "ControlFlow" ? code : `${code};`;
					})
					.join("\n"),
			);

		default:
			throw new Error("Unknown node type");
	}
}

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
