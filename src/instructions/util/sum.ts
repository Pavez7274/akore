import { Logger, NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

export default class $sum extends Instruction {
	override name = "$sum" as const;
	override id = "$akoreSum" as const;

	public override async parse({ parameters, total }: Token): Promise<Nodes.Node> {
		if (!parameters[0]) Logger.error("At least one argument is required!", total);
		return NodeFactory.line(await Promise.all(parameters.map(node => this.compiler.resolveAnyOrStringNode(node))), " + ");
	}
}
