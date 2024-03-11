import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class ObjectInstruction extends Instruction {
	override name = "$object" as const;
	override id = "$akoreObject" as const;
	public override compile(task: Task): "new Object()" {
		this.processNestedArguments(task);
		return "new Object()";
	}
}
