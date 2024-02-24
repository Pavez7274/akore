import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class ContinueInstruction extends Instruction {
	override name = "$continue" as const;
	override id = "$akitaContinue" as const;
	public override compile(task: Task): "continue;" {
		this.processNestedArguments(task);
		return "continue;";
	}
}
