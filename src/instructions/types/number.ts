import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class NumberInstruction extends Instruction {
	override name = "$number" as const;
	override id = "$akoreNumber" as const;
	public override compile(task: Task): string {
		this.buildNumberArgument(task.arguments[0]?.token);
		this.processNestedArguments(task);
		return task.arguments[0]?.token.value || "NaN";
	}
}
