import { Logger, NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

export default class $sub extends Instruction {
	override name = "$sub" as const;
	override id = "$akoreSub" as const;

	public override async parse({ parameters, total }: Token): Promise<Nodes.Node> {
		if (!parameters[0]) Logger.error("At least one argument is required!", total);
		return NodeFactory.line(await Promise.all(parameters.map(node => this.compiler.resolveAnyOrStringNode(node))), " - ");
	}
}
