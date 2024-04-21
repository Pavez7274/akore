import { Logger, NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

export default class $modulo extends Instruction {
	override name = "$modulo" as const;
	override id = "$akoreModulo" as const;

	public override async parse({ parameters, total }: Token): Promise<Nodes.Node> {
		if (!parameters[0]) Logger.error("At least one argument is required!", total);
		return NodeFactory.line(await Promise.all(parameters.map(node => this.transpiler.resolveAnyOrStringNode(node))), " % ");
	}
}
