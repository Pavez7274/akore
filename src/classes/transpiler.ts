import { Instruction, InstructionStatus, Manager } from "./instruction";
import { toValidVarName } from "../helpers/to_valid_var_name";
import { Lexer, Token, TokenParameter } from "./lexer";
import { Operators, startsWithSome } from "../helpers";
import { Nodes, compileNode } from "./nodes";
import { NodeFactory } from "./node_factory";
import { Logger } from "./logger";
import { yellow } from "colors";

/**
 * The `Transpiler` class is responsible for compiling input code into an abstract syntax tree (AST).
 * It provides methods for setting the input code, parsing tokens, and compiling the program.
 */
export class Transpiler {
	public program: Nodes.Program = NodeFactory.program([]);
	public variables = new Set<string>();
	public readonly lexer: Lexer;

	private busy = false;

	constructor(public manager: Manager = new Manager()) {
		this.lexer = new Lexer("", [], manager);
	}

	/**
	 * Gets the input string used by the Transpiler.
	 */
	public get input(): string {
		return this.lexer.input;
	}

	/**
	 * Checks if the Transpiler is currently busy.
	 * @returns `true` if the Transpiler is busy, `false` otherwise.
	 */
	public isBusy(): boolean {
		return this.busy;
	}

	/**
	 * Sets the input for the Transpiler.
	 * @param input The input string to be set.
	 * @returns The instance of the Transpiler.
	 */
	public setInput(input: string): this {
		if (this.busy) Logger.warn("The Transpiler is already busy!", "Transpiler.setInput");
		else this.lexer.setInput(input);
		return this;
	}

	/**
	 * Finds an instruction for the given token.
	 * @param token - The token to find an instruction for.
	 * @returns The instruction associated with the token, if found. Otherwise, undefined.
	 */
	public instructionForToken(token: Token): Instruction | undefined {
		return this.manager.instructions.find(i => i.id === token.name || i.name === token.name);
	}

	/**
	 * Parses a token and returns the corresponding node.
	 * If an instruction is found for the token and it is enabled, the token is parsed using the instruction.
	 * Otherwise, it returns a Null node.
	 * @param token - The token to parse.
	 * @returns A Promise that resolves to the parsed node.
	 */
	public async parseToken(token: Token): Promise<Nodes.Node> {
		const inst = this.instructionForToken(token);
		if (inst && inst.status === InstructionStatus.Enabled) return inst.parse(token);
		return Nodes.Null;
	}

	/**
	 * Transpiles the input code into executable code.
	 * @param debug - Whether to enable debug mode.
	 * @returns The transpiled code.
	 */
	public async transpile(debug = false) {
		if (this.busy) return Logger.warn("The Transpiler is already busy!", "Transpiler.compile");
		const start = Date.now();
		this.busy = true;
		if (debug) Logger.debug("Transpiler set to busy.", "Transpiler.compile");
		if (debug) Logger.debug(`Compiling this input:\n${yellow(this.input)}`, "Transpiler.compile");

		this.program.body = [];
		if (debug) Logger.debug("Program has been declared.", "Transpiler.compile");

		const tokens = this.lexer.tokenize();
		if (debug)
			Logger.debug(`Found ${tokens.length} tokens: ${tokens.map(({ name }) => yellow(name)).join(", ")}`, "Transpiler.compile");

		for (const token of tokens) {
			if (debug) Logger.debug(`Compiling ${yellow(token.name)}...`, "Transpiler.compile");
			try {
				const node = await this.parseToken(token);
				if (node) {
					if (debug) Logger.debug(`Compiled token as ${yellow(node.type)} successfully!`, "Transpiler.parseToken");
					this.program.body.push(node);
				}
			} catch (error) {
				Logger.warn((error as Error).message, "Transpiler.parseToken");
			} finally {
				this.busy = false;
			}
		}

		const program = this.program;

		this.program = NodeFactory.program([]);
		this.variables.clear();
		if (debug) {
			Logger.debug("Data was reset successfully.", "Transpiler.compile");
			Logger.debug("Transpiler set to idle.", "Transpiler.compile");
			Logger.debug(`Compiled successfully in ${yellow((Date.now() - start).toString())} miliseconds`, "Transpiler.compile");
		}

		return `/* compiled with akore ${require("../../package.json").version}\n\n${this.input} */\n${compileNode(program).code}`;
	}

	/**
	 * Resolves an Identifier node based on the given TokenParameter.
	 * @param param - The TokenParameter containing the value and nested tokens.
	 * @returns The resolved Identifier node.
	 */
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

	/**
	 * Resolves a string literal node based on the provided token parameter.
	 * @param param - The token parameter containing the value and nested tokens.
	 * @returns The resolved string literal node.
	 */
	public async resolveStringLiteralnode(param: TokenParameter) {
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

	/**
	 * Resolves a string type node based on the provided token parameter.
	 * If there are no nested tokens, it resolves to a StringLiteral node with the value as is.
	 * If there is a single nested token and its total value is equal to the value of the argument, that token is resolved.
	 * If none of the above options are true, an InterpolatedString is created.
	 * @param param The token parameter to resolve.
	 * @returns A promise that resolves to an AnyString node.
	 */
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
	public async resolveAnyOrStringNode(param: TokenParameter) {
		if (!isNaN(Number(param.value))) return NodeFactory.numberLiteral(Number(param.value));
		const node = await this.resolveStringTypeNode(param);
		return node.type === "InterpolatedString" && node.parts.length === 1 ? node.parts[0] || Nodes.Undefined : node;
	}

	/**
	 * Resolves a number type node.
	 * @param param - The TokenParameter to resolve.
	 * @returns A promise that resolves to a NumberLiteral node.
	 */
	public async resolveNumberTypeNode(param: TokenParameter): Promise<Nodes.NumberLiteral> {
		return NodeFactory.numberLiteral(Number(param.value));
	}

	/**
	 * Resolves a regular expression type node.
	 * @param param - The TokenParameter to resolve.
	 * @returns A promise that resolves to a node representing the regular expression, or null if the resolution fails.
	 */
	public async resolveRegexpTypeNode(param: TokenParameter): Promise<Nodes.CallExpression> {
		const [expression, flags] = param.value.split("/").slice(1);
		const expressionnode = await this.resolveStringTypeNode({ ...param, value: expression! });

		const parts: Nodes.Node[] = [expressionnode!];
		if (flags) parts.push(await this.resolveStringTypeNode({ ...param, value: flags }));

		return NodeFactory.callExpression(NodeFactory.identifier("new RegExp"), parts);
	}

	/**
	 * Resolves an object type node based on the provided token parameter.
	 * If the token parameter value can be parsed as an object, it returns an object node.
	 * Otherwise, it returns an empty object node.
	 * @param param - The TokenParameter to resolve.
	 * @returns The resolved object node.
	 */
	public async resolveObjectTypeNode(param: TokenParameter): Promise<Nodes.Object | typeof Nodes.Null> {
		try {
			/**
			 * Parses the key-value pairs of the object.
			 * @param pairs - The key-value pairs to parse.
			 * @returns The object node.
			 */
			const parse = async (pairs: ObjectPair[]) => {
				const properties: Nodes.Object["properties"] = [];

				// Iterate over each key-value pair and parse them
				for (const { value, key } of pairs) {
					properties.push({
						key: await this.resolveIdentifierNode({ ...param, value: key }),
						// If the value is an object, parse it recursively
						// Otherwise, resolve it as a any or string
						value:
							value.startsWith("{") && value.endsWith("}")
								? await parse(ObjectTranspiler.transpile(value.slice(1, -1)))
								: await this.resolveAnyOrStringNode({ ...param, value: value }),
					});
				}

				// Return the object node
				return NodeFactory.object(properties);
			};

			// Transpile the object and parse it
			return await parse(ObjectTranspiler.transpile(param.value.trim().slice(1, -1)));
		} catch (error) {
			Logger.warn("Cannot parse object!", "Transpiler.resolveObjectTypeNode");
			console.error(error);
		}

		// If the object cannot be parsed, return an null node
		return Nodes.Null;
	}

	/**
	 * This doesn't works yet.
	 */
	public resolveArrayTypeNode(_param: TokenParameter): Nodes.Array {
		// Tengo autismo :3
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

export interface ObjectPair {
	key: string;
	value: string;
}
/**
 * The `ObjectTranspiler` class is responsible for transpiling a string representation of an object into an array of key-value pairs.
 */
export class ObjectTranspiler {
	/**
	 * Transpiles a string representation of an object into an array of key-value pairs.
	 * @param input The input string to be transpiled.
	 * @returns An array of key-value pairs.
	 * @example
	 * ObjectTranspiler.transpile('key1="value1";key2="value2";');
	 * // [{ key: 'key1', value: 'value1' }, { key: 'key2', value: 'value2' }]
	 */
	public static transpile(input: string): ObjectPair[] {
		const pairs: ObjectPair[] = [];
		// The key and value of the current key-value pair
		let key = "";
		let value = "";

		// Flags to keep track of the current state
		let depth = 0;
		let isParsingKey = true;
		let isInsideQuotes = false;
		let ignoreNextChar = false;

		// Iterate over each character in the input string
		for (let i = 0; i < input.length; i++) {
			const char = input[i];
			if (!char) break;

			// If the next character should be ignored, skip it
			if (ignoreNextChar) {
				ignoreNextChar = false;
				continue;
			}
			// If the current character is a backslash, the next character should be ignored
			if (char === "\\") {
				ignoreNextChar = true;
				value += char;
				continue;
			}

			if (isInsideQuotes) {
				// If the current character is a double quote, it means the end of the string
				if (char === '"') isInsideQuotes = false;
				// Otherwise, accumulate characters to form the value
				else value += char;
				continue;
			}

			// If the current character is a curly brace, it means the start or end of an object
			if (!isParsingKey && char === "{") {
				value += char;
				depth++;
				continue;
			}
			// If the current character is a curly brace, it means the end of an object
			else if (!isParsingKey && char === "}") {
				value += char;
				depth--;
				continue;
			}

			// If the depth is 0, it means the current character is not inside an object
			if (depth === 0) {
				switch (char) {
					// If the current character is an equal sign, it means the end of the key
					case "=":
						isParsingKey = false;
						break;

					// If the current character is a semicolon or a newline, it means the end of a key-value pair
					case "\n":
					case ";":
						pairs.push({ key: key.trim(), value: value.trim() });
						key = "";
						value = "";
						isParsingKey = true;
						break;

					// If the current character is a double quote, it means the start of a string value
					case '"':
						isInsideQuotes = true;
						break;

					// Otherwise, accumulate characters to form the key
					default:
						if (isParsingKey && char.trim() !== "") key += char;
						else value += char;
						break;
				}
			} else if (!isParsingKey) value += char;
		}

		if (key !== "" || value !== "") {
			pairs.push({ key: key.trim(), value: value.trim() });
		}

		return pairs.filter(({ key }) => key !== "");
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

// const com = new Transpiler();

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
