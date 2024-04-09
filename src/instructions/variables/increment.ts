import { NodeFactory, Logger, Nodes, Token } from "../../classes/";
import { Instruction } from "../../classes/instruction";

export default class $increment extends Instruction {
	override name = "$increment" as const;
	override id = "$akoreIncrement" as const;

	public override async parse({ parameters, total }: Token): Promise<Nodes.Node> {
		if (!parameters[0]) Logger.error("At least one argument is required!", total);
		const parts = await Promise.all(parameters.map(this.compiler.resolveIdentifierNode));
		return NodeFactory.line([NodeFactory.line(parts, "."), NodeFactory.identifier("++")], "");
	}
}
