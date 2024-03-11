import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class WhileInstruction extends Instruction {
	override name = "$while" as const;
	override id = "$akoreWhile" as const;
	public override compile(task: Task): string {
		this.buildConditionArgument(task.arguments[0]?.token);
		this.processNestedArguments(task);

		const [condition, code] = task.argumentValues() as [string, string];
		return `while (${condition}) {${code}}`;
	}
}
