import {  NodeFactory, Token, Nodes } from "../../classes";
import { Instruction } from "../../classes/instruction";

export default class $while extends Instruction {
	override name = "$while" as const;
	override id = "$akoreWhile" as const;

	public override async parse({ parameters }: Token): Promise<Nodes.ControlFlow> {
		return NodeFactory.controlFlow([
			{
				keyword: "while",
				condition: await this.compiler.resolveConditionTypeNode(parameters[0]!),
				body: await this.compiler.resolveProgramTypeNode(parameters[1]!),
			},
		]);
	}
}
