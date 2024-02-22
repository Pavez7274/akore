import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class SumInstruction extends Instruction {
	override name = "$sum" as const;
	override id = "$akitaSum" as const;
	public override compile(task: Task): string {
		this.buildStringArguments(task.arguments);
		this.processNestedArguments(task);
		return `${task.argValues().join("+")}`;
	}
}
