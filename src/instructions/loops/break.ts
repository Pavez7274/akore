import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class BreakInstruction extends Instruction {
	override name = "$break" as const;
	override id = "$akoreBreak" as const;
	public override compile(task: Task): "break;" {
		this.processNestedArguments(task);
		return "break;";
	}
}
