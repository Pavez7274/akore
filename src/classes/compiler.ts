import { Instruction, InstructionStatus, Manager } from "./instruction";
import { toValidVarName } from "../helpers/to_valid_var_name";
import { Lexer, Token, TokenParameter } from "./lexer";
import { Operators, startsWithSome } from "../helpers";
import { Nodes, compileNode } from "./nodes";
import { NodeFactory } from "./node_factory";
import { Logger } from "./logger";
import { yellow } from "colors";

export class Compiler {
	public program: Nodes.Program = NodeFactory.program([]);
	public variables = new Set<string>();
	public readonly lexer: Lexer;

	private busy = false;

	constructor(public manager: Manager = new Manager()) {
		this.lexer = new Lexer("", [], manager);
	}

	public get input(): string {
		return this.lexer.input;
	}

	public isBusy() {
		return this.busy;
	}

	/**
	 * Sets the input code for compilation.
	 * @param input The input code to set.
	 * @returns The Compiler instance for method chaining.
	 */
	public setInput(input: string): this {
		if (this.busy) Logger.warn("The compiler is already busy!", "Compiler.setInput");
		else this.lexer.setInput(input);
		return this;
	}

	public findInstructionForToken(token: Token): Instruction | undefined {
		return this.manager.instructions.find(i => i.id === token.name || i.name === token.name);
	}

	public async parseToken(token: Token): Promise<Nodes.Node> {
		const inst = this.findInstructionForToken(token);
		if (inst && inst.status === InstructionStatus.Enabled) return inst.parse(token);
		return Nodes.Null;
	}

	/**
	 * Compiles the input code.
	 * @param debug Indicates whether debug mode is enabled.
	 * @returns The compiled code, or void if an error occurred.
	 */
	public async compile(debug = false) {
		if (this.busy) return Logger.warn("The compiler is already busy!", "Compiler.compile");
		const start = Date.now();
		this.busy = true;
		if (debug) Logger.debug("Compiler set to busy.", "Compiler.compile");
		if (debug) Logger.debug(`Compiling this input:\n${yellow(this.input)}`, "Compiler.compile");

		this.program.body = [];
		if (debug) Logger.debug("Program has been declared.", "Compiler.compile");

		const tokens = this.lexer.tokenize();
		if (debug)
			Logger.debug(`Found ${tokens.length} tokens: ${tokens.map(({ name }) => yellow(name)).join(", ")}`, "Compiler.compile");

		for (const token of tokens) {
			if (debug) Logger.debug(`Compiling ${yellow(token.name)}...`, "Compiler.compile");
			await this.parseToken(token)
				.then(node => {
					if (node) {
						if (debug) Logger.debug(`Compiled token as ${yellow(node.type)} successfully!`, "Compiler.parseToken");
						this.program.body.push(node);
					}
				})
				.catch((error: Error) => {
					Logger.warn(error.message, "Compiler.parseToken");
					throw error;
				});
		}

		const program = this.program;

		this.busy = false;
		this.program = NodeFactory.program([]);
		this.variables.clear();
		if (debug) Logger.debug("Data was reset successfully.", "Compiler.compile");
		if (debug) Logger.debug("Compiler set to idle.", "Compiler.compile");

		if (debug)
			Logger.debug(`Compiled successfully in ${yellow((Date.now() - start).toString())} miliseconds`, "Compiler.compile");

		return compileNode(program).code;
	}

	public async resolveIdentifierNode(param: TokenParameter) {
		// If there are no nested tokens, it resolves to a Identifier node with the value as is
		if (param.nested.length === 0) return NodeFactory.identifier(toValidVarName(param.value));

		// If there is a single nested token and its total value is equal to the value of the argument, that token is resolved
		if (param.nested.length === 1 && param.nested[0]?.total === param.value)
			return await this.parseToken(param.nested[0]).then(node =>
				NodeFactory.identifier(node ? toValidVarName(compileNode(node).code) : ""),
			);

		let name = "";
		for (const nested of param.nested) {
			if (param.value.indexOf(nested.total) === -1) name += nested.total;
			else {
				const parsed = await this.parseToken(nested);
				if (parsed) name += compileNode(parsed).code;
			}
		}
		return NodeFactory.identifier(toValidVarName(name));
	}

	public async resolveStringLiteralNode(param: TokenParameter) {
		// If there are no nested tokens, it resolves to a StringLiteral node with the value as is
		if (param.nested.length === 0) return NodeFactory.stringLiteral(param.value);

		// If there is a single nested token and its total value is equal to the value of the argument, that token is resolved
		if (param.nested.length === 1 && param.nested[0]?.total === param.value)
			return await this.parseToken(param.nested[0]).then(node => NodeFactory.stringLiteral(node ? compileNode(node).code : ""));

		// If none of the above options are true, a StringLiteral is created
		let string = "";
		for (const nested of param.nested) {
			if (param.value.indexOf(nested.total) === -1) string += nested.total;
			else {
				const parsed = await this.parseToken(nested);
				if (parsed) string += compileNode(parsed).code;
			}
		}
		return NodeFactory.stringLiteral(string);
	}

	public async resolveStringTypeNode(param: TokenParameter): Promise<Nodes.AnyString> {
		// If there are no nested tokens, it resolves to a StringLiteral node with the value as is
		if (param.nested.length === 0) return NodeFactory.stringLiteral(param.value);

		// If there is a single nested token and its total value is equal to the value of the argument, that token is resolved
		if (param.nested.length === 1 && param.nested[0]?.total === param.value)
			return await this.parseToken(param.nested[0]).then(node =>
				node ? NodeFactory.interpolatedString([node]) : NodeFactory.stringLiteral(""),
			);

		// If none of the above options are true, an InterpolatedString is created
		const parts: Nodes.Node[] = [];
		let current = "";
		for (const nested of param.nested) {
			const index = param.value.indexOf(nested.total);
			if (index === -1) current += nested.total;
			else {
				if (current !== "") {
					parts.push(NodeFactory.stringLiteral(current));
					current = "";
				}
				const parsed = await this.parseToken(nested);
				if (parsed) parts.push(parsed);
				current = param.value.slice(index + nested.total.length);
			}
		}
		if (current !== "") parts.push(NodeFactory.stringLiteral(current));
		return NodeFactory.interpolatedString(parts);
	}

	public async resolveAnyOrStringNode(param: TokenParameter) {
		if (!isNaN(Number(param.value))) return NodeFactory.numberLiteral(Number(param.value));
		const node = await this.resolveStringTypeNode(param);
		return node.type === "InterpolatedString" && node.parts.length === 1 ? node.parts[0] || Nodes.Undefined : node;
	}

	public async resolveNumberTypeNode(param: TokenParameter): Promise<Nodes.NumberLiteral> {
		return NodeFactory.numberLiteral(Number(param.value));
	}

	public async resolveRegexpTypeNode(param: TokenParameter): Promise<Nodes.Node | null> {
		const [expression, flags] = param.value.split("/").slice(1);
		const expressionNode = await this.resolveStringTypeNode({ ...param, value: expression! });

		const parts: Nodes.Node[] = [expressionNode!];
		if (flags) parts.push(await this.resolveStringTypeNode({ ...param, value: flags }));

		return NodeFactory.callExpression(NodeFactory.identifier("new RegExp"), parts);
	}

	/**
	 * This doesn't works!!
	 */
	public resolveObjectTypeNode(_param: TokenParameter): Nodes.Object {
		return NodeFactory.object([]);
	}

	/**
	 * This doesn't works!!
	 */
	public resolveArrayTypeNode(_param: TokenParameter): Nodes.Array {
		return NodeFactory.array([]);
	}

	public async resolveConditionTypeNode(param: TokenParameter): Promise<Nodes.Line> {
		const condition = NodeFactory.line([]);
		let current = "",
			depth = 0,
			i = 0;

		while (i <= param.value.length) {
			if (i === param.value.length) {
				current = current.trim();
				const nested = param.nested
					.filter(nest => current.includes(nest.total))
					.map(nest => ({
						...nest,
						start: current.indexOf(nest.total),
						end: current.indexOf(nest.total) + nest.total.length,
					}));

				condition.parts.push(
					await this.resolveAnyOrStringNode({
						value: current,
						nested,
					}),
				);
				break;
			}

			const char = param.value.charAt(i);
			const op = startsWithSome(param.value, i, Operators);

			// If an operator is found, process the current string as a standalone argument
			if (depth === 0 && op) {
				current = current.trim();
				const nested = param.nested
					.filter(nest => current.includes(nest.total))
					.map(nest => ({
						...nest,
						start: current.indexOf(nest.total),
						end: current.indexOf(nest.total) + nest.total.length,
					}));

				condition.parts.push(
					await this.resolveAnyOrStringNode({
						value: current,
						nested,
					}),
				);
				condition.parts.push(NodeFactory.identifier(op));
				i += op.length;
				current = "";
			}
			// If it's the beginning of a nested, increment depth
			else if (char === "[") current += (depth++, i++, char);
			// If it's the end of a nested, decrement depth
			else if (char === "]" && depth) current += (depth--, i++, char);
			// If it's backslash, escapes the next character
			else if (char === "\\") {
				const next = param.value.charAt(i + 1);
				if (typeof next === "string") current += ((i += 2), next);
				else current += (i++, char);
			} else if (depth === 0 && char.trim() === "") i++;
			// Otherwise, accumulate characters to form the current argument
			else current += (i++, char);
		}

		return condition;
	}

	public async resolveExpressionTypeNode(param: TokenParameter): Promise<Nodes.ExpressionStatement> {
		return NodeFactory.expressionStatement(
			await Promise.all(param.nested.map(async e => (await this.parseToken(e)) || Nodes.Undefined)),
		);
	}

	public async resolveProgramTypeNode(param: TokenParameter): Promise<Nodes.Program> {
		return NodeFactory.program(await Promise.all(param.nested.map(async e => (await this.parseToken(e)) || Nodes.Undefined)));
	}
}

// ? TESTING
// import $increment from "../instructions/variables/increment";
// import $call from "../instructions/variables/call";
// import $var from "../instructions/variables/var";
// import $get from "../instructions/variables/get";
// import $array from "../instructions/types/array";
// import $print from "../instructions/print";
// import $if from "../instructions/if";
// import $for from "../instructions/loops/for";
// import $modulo from "../instructions/util/modulo";
// import $continue from "../instructions/loops/continue";

// // function printf(...r: unknown[]) {
// // 	console.log(...r.map(e => require("util").inspect(e, { depth: null, colors: true })));
// // }

// const com = new Compiler();

// com.manager.add(
// 	new $increment(com),
// 	new $continue(com),
// 	new $modulo(com),
// 	new $print(com),
// 	new $array(com),
// 	new $call(com),
// 	new $for(com),
// 	new $var(com),
// 	new $get(com),
// 	new $if(com),
// );

// com
// 	.setInput(
// 		[
// 			"$var[arr;$array]",
// 			"$for[$var[i;0];$get[i] < 10;$increment[i];",
// 			"	$if[$modulo[$get[i];2] === 0;",
// 			"		$call[arr.push;$get[i]]",
// 			"		$print[$get[arr]];",
// 			"		$continue",
// 			"	]",
// 			"]",
// 		].join("\n"),
// 	)
// 	.compile(true)
// 	.then(e => {
// 		console.log(yellow(e || ""));
// 		eval(e || "");
// 	});
