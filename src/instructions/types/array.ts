import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class ArrayInstruction extends Instruction {
	override name = "$array" as const;
	override id = "$akoreArray" as const;
	public override compile(task: Task): "new Array()" {
		this.processNestedArguments(task);
		return "new Array()";
	}
}
