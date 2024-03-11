import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class StringInstruction extends Instruction {
	override name = "$string" as const;
	override id = "$akoreString" as const;
	public override compile(task: Task): string {
		this.buildStringArguments(task.arguments);
		this.processNestedArguments(task);
		return task.argumentValues().join(" ");
	}
}
