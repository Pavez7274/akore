import { Logger, NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

/**
 * Represents the $call instruction.
 * This instruction is used to call a function.
 *
 * @example
 * $call[func;arg1;$get[some];1] // => func("arg1", some, 1);
 * $call[process.exit] // => process.exit();
 */
export default class $call extends Instruction {
	override name = "$call" as const;
	override id = "$akoreCall" as const;

	public override async parse({ parameters: [key, ...args] }: Token): Promise<Nodes.Node> {
		if (!key) Logger.error("Expected a key for the call!", this.name);
		return NodeFactory.callExpression(
			await this.transpiler.resolveIdentifierNode(key),
			await Promise.all(args.map(token => this.transpiler.resolveAnyOrStringNode(token))),
		);
	}
}
