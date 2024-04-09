"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const instruction_1 = require("./instruction");
const to_valid_var_name_1 = require("../helpers/to_valid_var_name");
const lexer_1 = require("./lexer");
const helpers_1 = require("../helpers");
const nodes_1 = require("./nodes");
const node_factory_1 = require("./node_factory");
const logger_1 = require("./logger");
const colors_1 = require("colors");
class Compiler {
    manager;
    program = node_factory_1.NodeFactory.program([]);
    variables = new Set();
    lexer;
    busy = false;
    constructor(manager = new instruction_1.Manager()) {
        this.manager = manager;
        this.lexer = new lexer_1.Lexer("", [], manager);
    }
    get input() {
        return this.lexer.input;
    }
    isBusy() {
        return this.busy;
    }
    /**
     * Sets the input code for compilation.
     * @param input The input code to set.
     * @returns The Compiler instance for method chaining.
     */
    setInput(input) {
        if (this.busy)
            logger_1.Logger.warn("The compiler is already busy!", "Compiler.setInput");
        else
            this.lexer.setInput(input);
        return this;
    }
    findInstructionForToken(token) {
        return this.manager.instructions.find(i => i.id === token.name || i.name === token.name);
    }
    async parseToken(token) {
        const inst = this.findInstructionForToken(token);
        if (inst && inst.status === "ENABLED" /* InstructionStatus.Enabled */)
            return inst.parse(token);
        return nodes_1.Nodes.Null;
    }
    /**
     * Compiles the input code.
     * @param debug Indicates whether debug mode is enabled.
     * @returns The compiled code, or void if an error occurred.
     */
    async compile(debug = false) {
        if (this.busy)
            return logger_1.Logger.warn("The compiler is already busy!", "Compiler.compile");
        const start = Date.now();
        this.busy = true;
        if (debug)
            logger_1.Logger.debug("Compiler set to busy.", "Compiler.compile");
        if (debug)
            logger_1.Logger.debug(`Compiling this input:\n${(0, colors_1.yellow)(this.input)}`, "Compiler.compile");
        this.program.body = [];
        if (debug)
            logger_1.Logger.debug("Program has been declared.", "Compiler.compile");
        const tokens = this.lexer.tokenize();
        if (debug)
            logger_1.Logger.debug(`Found ${tokens.length} tokens: ${tokens.map(({ name }) => (0, colors_1.yellow)(name)).join(", ")}`, "Compiler.compile");
        for (const token of tokens) {
            if (debug)
                logger_1.Logger.debug(`Compiling ${(0, colors_1.yellow)(token.name)}...`, "Compiler.compile");
            await this.parseToken(token)
                .then(node => {
                if (node) {
                    if (debug)
                        logger_1.Logger.debug(`Compiled token as ${(0, colors_1.yellow)(node.type)} successfully!`, "Compiler.parseToken");
                    this.program.body.push(node);
                }
            })
                .catch((error) => {
                logger_1.Logger.warn(error.message, "Compiler.parseToken");
                throw error;
            });
        }
        const program = this.program;
        this.busy = false;
        this.program = node_factory_1.NodeFactory.program([]);
        this.variables.clear();
        if (debug)
            logger_1.Logger.debug("Data was reset successfully.", "Compiler.compile");
        if (debug)
            logger_1.Logger.debug("Compiler set to idle.", "Compiler.compile");
        if (debug)
            logger_1.Logger.debug(`Compiled successfully in ${(0, colors_1.yellow)((Date.now() - start).toString())} miliseconds`, "Compiler.compile");
        return (0, nodes_1.compileNode)(program).code;
    }
    async resolveIdentifierNode(param) {
        // If there are no nested tokens, it resolves to a Identifier node with the value as is
        if (param.nested.length === 0)
            return node_factory_1.NodeFactory.identifier((0, to_valid_var_name_1.toValidVarName)(param.value));
        // If there is a single nested token and its total value is equal to the value of the argument, that token is resolved
        if (param.nested.length === 1 && param.nested[0]?.total === param.value)
            return await this.parseToken(param.nested[0]).then(node => node_factory_1.NodeFactory.identifier(node ? (0, to_valid_var_name_1.toValidVarName)((0, nodes_1.compileNode)(node).code) : ""));
        let name = "";
        for (const nested of param.nested) {
            if (param.value.indexOf(nested.total) === -1)
                name += nested.total;
            else {
                const parsed = await this.parseToken(nested);
                if (parsed)
                    name += (0, nodes_1.compileNode)(parsed).code;
            }
        }
        return node_factory_1.NodeFactory.identifier((0, to_valid_var_name_1.toValidVarName)(name));
    }
    async resolveStringLiteralNode(param) {
        // If there are no nested tokens, it resolves to a StringLiteral node with the value as is
        if (param.nested.length === 0)
            return node_factory_1.NodeFactory.stringLiteral(param.value);
        // If there is a single nested token and its total value is equal to the value of the argument, that token is resolved
        if (param.nested.length === 1 && param.nested[0]?.total === param.value)
            return await this.parseToken(param.nested[0]).then(node => node_factory_1.NodeFactory.stringLiteral(node ? (0, nodes_1.compileNode)(node).code : ""));
        // If none of the above options are true, a StringLiteral is created
        let string = "";
        for (const nested of param.nested) {
            if (param.value.indexOf(nested.total) === -1)
                string += nested.total;
            else {
                const parsed = await this.parseToken(nested);
                if (parsed)
                    string += (0, nodes_1.compileNode)(parsed).code;
            }
        }
        return node_factory_1.NodeFactory.stringLiteral(string);
    }
    async resolveStringTypeNode(param) {
        // If there are no nested tokens, it resolves to a StringLiteral node with the value as is
        if (param.nested.length === 0)
            return node_factory_1.NodeFactory.stringLiteral(param.value);
        // If there is a single nested token and its total value is equal to the value of the argument, that token is resolved
        if (param.nested.length === 1 && param.nested[0]?.total === param.value)
            return await this.parseToken(param.nested[0]).then(node => node ? node_factory_1.NodeFactory.interpolatedString([node]) : node_factory_1.NodeFactory.stringLiteral(""));
        // If none of the above options are true, an InterpolatedString is created
        const parts = [];
        let current = "";
        for (const nested of param.nested) {
            const index = param.value.indexOf(nested.total);
            if (index === -1)
                current += nested.total;
            else {
                if (current !== "") {
                    parts.push(node_factory_1.NodeFactory.stringLiteral(current));
                    current = "";
                }
                const parsed = await this.parseToken(nested);
                if (parsed)
                    parts.push(parsed);
                current = param.value.slice(index + nested.total.length);
            }
        }
        if (current !== "")
            parts.push(node_factory_1.NodeFactory.stringLiteral(current));
        return node_factory_1.NodeFactory.interpolatedString(parts);
    }
    async resolveAnyOrStringNode(param) {
        if (!isNaN(Number(param.value)))
            return node_factory_1.NodeFactory.numberLiteral(Number(param.value));
        const node = await this.resolveStringTypeNode(param);
        return node.type === "InterpolatedString" && node.parts.length === 1 ? node.parts[0] || nodes_1.Nodes.Undefined : node;
    }
    async resolveNumberTypeNode(param) {
        return node_factory_1.NodeFactory.numberLiteral(Number(param.value));
    }
    async resolveRegexpTypeNode(param) {
        const [expression, flags] = param.value.split("/").slice(1);
        const expressionNode = await this.resolveStringTypeNode({ ...param, value: expression });
        const parts = [expressionNode];
        if (flags)
            parts.push(await this.resolveStringTypeNode({ ...param, value: flags }));
        return node_factory_1.NodeFactory.callExpression(node_factory_1.NodeFactory.identifier("new RegExp"), parts);
    }
    /**
     * This doesn't works!!
     */
    resolveObjectTypeNode(_param) {
        return node_factory_1.NodeFactory.object([]);
    }
    /**
     * This doesn't works!!
     */
    resolveArrayTypeNode(_param) {
        return node_factory_1.NodeFactory.array([]);
    }
    async resolveConditionTypeNode(param) {
        const condition = node_factory_1.NodeFactory.line([]);
        let current = "", depth = 0, i = 0;
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
                condition.parts.push(await this.resolveAnyOrStringNode({
                    value: current,
                    nested,
                }));
                break;
            }
            const char = param.value.charAt(i);
            const op = (0, helpers_1.startsWithSome)(param.value, i, helpers_1.Operators);
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
                condition.parts.push(await this.resolveAnyOrStringNode({
                    value: current,
                    nested,
                }));
                condition.parts.push(node_factory_1.NodeFactory.identifier(op));
                i += op.length;
                current = "";
            }
            // If it's the beginning of a nested, increment depth
            else if (char === "[")
                current += (depth++, i++, char);
            // If it's the end of a nested, decrement depth
            else if (char === "]" && depth)
                current += (depth--, i++, char);
            // If it's backslash, escapes the next character
            else if (char === "\\") {
                const next = param.value.charAt(i + 1);
                if (typeof next === "string")
                    current += ((i += 2), next);
                else
                    current += (i++, char);
            }
            else if (depth === 0 && char.trim() === "")
                i++;
            // Otherwise, accumulate characters to form the current argument
            else
                current += (i++, char);
        }
        return condition;
    }
    async resolveExpressionTypeNode(param) {
        return node_factory_1.NodeFactory.expressionStatement(await Promise.all(param.nested.map(async (e) => (await this.parseToken(e)) || nodes_1.Nodes.Undefined)));
    }
    async resolveProgramTypeNode(param) {
        return node_factory_1.NodeFactory.program(await Promise.all(param.nested.map(async (e) => (await this.parseToken(e)) || nodes_1.Nodes.Undefined)));
    }
}
exports.Compiler = Compiler;
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
