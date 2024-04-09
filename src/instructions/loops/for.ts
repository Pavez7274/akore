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
						await this.compiler.resolveExpressionTypeNode(parameters[0]!),
						await this.compiler.resolveConditionTypeNode(parameters[1]!),
						await this.compiler.resolveExpressionTypeNode(parameters[2]!),
					],
					"; ",
				),
				body: await this.compiler.resolveProgramTypeNode(parameters[3]!),
			},
		]);
	}
}
