import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class ArrayInstruction extends Instruction {
	override name = "$array" as const;
	override id = "$akitaArray" as const;
	public override compile(task: Task): string {
		this.processNestedArguments(task);
		return "[" + task.argValues().join(",") + "]";
	}
}
