import { Logger, NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

export default class $get extends Instruction {
	override name = "$get" as const;
	override id = "$akoreGet" as const;

	public override async parse({ parameters, total }: Token): Promise<Nodes.Node> {
		if (!parameters[0]) Logger.error("At least one argument is required!", total);
		return NodeFactory.line(
			await Promise.all(parameters.map(this.compiler.resolveIdentifierNode)),
			".",
		);
	}
}
