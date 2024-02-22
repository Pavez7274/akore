import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class NullInstruction extends Instruction {
	override name = "$null" as const;
	override id = "$akitaNull" as const;
	public override compile(task: Task): "null" {
		this.processNestedArguments(task);
		return "null";
	}
}
