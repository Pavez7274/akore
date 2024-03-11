import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class GetInstruction extends Instruction {
	override name = "$get" as const;
	override id = "$akoreGet" as const;
	public override compile(task: Task): string {
		this.processNestedArguments(task);
		return task.argumentValues().join(".");
	}
}
