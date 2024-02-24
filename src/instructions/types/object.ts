import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class ObjectInstruction extends Instruction {
	override name = "$object" as const;
	override id = "$akitaObject" as const;
	public override compile(task: Task): string {
		this.processNestedArguments(task);
		return "{" + task.argValues().join(",") + "}";
	}
}
