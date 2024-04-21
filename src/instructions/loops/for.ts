import { NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

export default class $for extends Instruction {
	override name = "$for" as const;
	override id = "$akoreFor" as const;

	public override async parse({ parameters }: Token): Promise<Nodes.ControlFlow> {
		return NodeFactory.controlFlow([
			{
				keyword: "for",
				condition: NodeFactory.line(
					[
						await this.transpiler.resolveExpressionTypeNode(parameters[0]!),
						await this.transpiler.resolveConditionTypeNode(parameters[1]!),
						await this.transpiler.resolveExpressionTypeNode(parameters[2]!),
					],
					"; ",
				),
				body: await this.transpiler.resolveProgramTypeNode(parameters[3]!),
			},
		]);
	}
}
