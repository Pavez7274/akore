import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class WhileInstruction extends Instruction {
	override name = "$while" as const;
	override id = "$akitaWhile" as const;
	public override compile(task: Task): string {
		this.buildConditionArgument(task.arguments[0]?.value);
		this.processNestedArguments(task);

		const [condition, code] = task.argValues() as [string, string];
		return `while (${condition}) {${code}}`;
	}
}
