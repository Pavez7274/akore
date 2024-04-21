import { NodeFactory, Logger, Nodes, Token } from "../../classes";
import { Instruction } from "../../classes/instruction";

/**
 * Represents the $compound instruction.
 * This instruction is used to increment/decrement a variable.
 *
 * @example
 * $var[myVar;5] // => var myVar = 5;
 * $compound[myVar;2] // => myVar += 2;
 * $compound[myVar] // => myVar++;
 * $compound[myVar;-1] // => myVar -= 1;
 */
export default class $compound extends Instruction {
	override name = "$compound" as const;
	override id = "$akoreCompound" as const;

	public override async parse({ parameters: [key, by] }: Token): Promise<Nodes.Node> {
		if (!key) Logger.error("Expected a key for the compound assignment!", this.name);
		const amount = by ? await this.transpiler.resolveNumberTypeNode(by) : NodeFactory.numberLiteral(1);
		const line = NodeFactory.line([await this.transpiler.resolveIdentifierNode(key)]);

		// If the amount is 1 or -1, we can use the increment/decrement operators.
		// Otherwise, we use the += or -= operators.
		if (amount.value === 1) line.parts.push(NodeFactory.identifier("++"));
		else if (amount.value === -1) line.parts.push(NodeFactory.identifier("--"));
		else if (amount.value > 1) line.parts.push(NodeFactory.identifier("+="), amount);
		else if (amount.value < -1) line.parts.push(NodeFactory.identifier("-="), NodeFactory.numberLiteral(-amount.value));
		else Logger.warn("Incrementing/decrementing by 0 doesn't change anything.", this.name);

		return line;
	}
}
