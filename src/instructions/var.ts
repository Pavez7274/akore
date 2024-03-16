import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class VarInstruction extends Instruction {
	override name = "$var" as const;
	override id = "$akoreVar" as const;

	public override compile(task: Task): string {
		this.buildStringArgument(task.arguments[1]?.token!);
		this.processNestedArguments(task);

		const [key, value] = task.argumentValues() as [string, string];

		this.compiler.setVariable(key.split(".")[0]!);
		return value ? `${key} = ${value}` : key;
	}
}
