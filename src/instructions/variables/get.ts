import { Logger, NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

/**
 * Represents the $get instruction.
 * This instruction is used to get a variable.
 *
 * @example
 * $var[text;Surfing The Void] // => var text = "Surfing the void";
 * $get[text] // => text1;
 */
export default class $get extends Instruction {
	override name = "$get" as const;
	override id = "$akoreGet" as const;

	public override async parse({ parameters }: Token): Promise<Nodes.Node> {
		if (!parameters.length) Logger.error("Expected a key for the get!", this.name);
		return NodeFactory.line(await Promise.all(parameters.map(token => this.transpiler.resolveIdentifierNode(token))), ".");
	}
}
