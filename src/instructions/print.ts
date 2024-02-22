import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class PrintInstruction extends Instruction {
	override name = "$print" as const;
	override id = "$akitaPrint" as const;
	public override compile(task: Task): `console.log(${string})` {
		this.buildStringArguments(task.arguments);
		this.processNestedArguments(task);
		return `console.log(${task.arguments.map((a) => a.value.value)})`;
	}
}
