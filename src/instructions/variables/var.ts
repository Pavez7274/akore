import { Logger, NodeFactory, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

/**
 * @example
 * // Akore code:
 * $var[text;Hello gotou]
 * $print[$get[text]]
 *
 * // Compiled JavaScript:
 * var text = "Hello gotou";
 * console.log(text);
 */
export default class $var extends Instruction {
	override name = "$var" as const;
	override id = "$akoreVar" as const;

	public override async parse({ parameters, total, path }: Token) {
		if (!parameters[0]) Logger.error("At least one argument is required!", total);

		const key = await this.compiler.resolveIdentifierNode(parameters[0]!);
		const value = parameters[1] ? await this.compiler.resolveAnyOrStringNode(parameters[1]) : void 0;

		const name = key.name.split(".")[0]!;

		if (this.compiler.variables.has(name)) return value ? NodeFactory.line([key, Nodes.Equal, value]) : key;
		else {
			this.compiler.variables.add(name);
			if (path.includes(".")) {
				this.compiler.program.body.push(NodeFactory.line([Nodes.Var, key, Nodes.Equal, value || Nodes.Undefined]));
				return key;
			} else return value ? NodeFactory.line([Nodes.Var, key, Nodes.Equal, value]) : NodeFactory.line([Nodes.Var, key]);
		}
	}
}
