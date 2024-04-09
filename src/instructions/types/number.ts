import { Token, Nodes, NodeFactory } from "../../classes";
import { Instruction } from "../../classes/instruction";

export default class NumberInstruction extends Instruction {
	override name = "$number" as const;
	override id = "$akoreNumber" as const;

	public override async parse({ parameters }: Token): Promise<Nodes.Node> {
		return NodeFactory.numberLiteral(Number(this.compiler.resolveAnyOrStringNode(parameters[0]!)));
	}
}
