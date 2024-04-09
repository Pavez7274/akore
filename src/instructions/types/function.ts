import { Logger, NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

/**
 * @example
 * // Akore code:
 * $function[logInRed;msg;$print[\\x1b[34m$get[msg]]]
 * $call[logInRed;hiii :3]
 *
 * // Compiled JavaScript:
 * function logInRed (msg) {
 * 	console.log(`\x1b[34m${msg}`);
 * }
 * logInRed("hiii :3");
 */
export default class $function extends Instruction {
	override name = "$function" as const;
	override id = "$akoreFunction" as const;

	public override async parse({ parameters: [name, params, body] }: Token): Promise<Nodes.ControlFlow> {
		if (!name || !params || !body) Logger.error("At least three arguments are required!", this.name);

		const keyword = await this.compiler.resolveIdentifierNode(name);

		return NodeFactory.controlFlow([
			{
				keyword: keyword.name === "" ? "function" : `function ${keyword.name}`,
				condition: await this.compiler.resolveExpressionTypeNode(params),
				body: await this.compiler.resolveProgramTypeNode(body),
			},
		]);
	}
}
