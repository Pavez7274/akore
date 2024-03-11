import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class NewInstruction extends Instruction {
	override name = "$new" as const;
	override id = "$akoreNew" as const;
	public override compile(task: Task): string {
		for (let index = 1; index < task.arguments.length; index++) {
			this.buildConditionArgument(task.arguments[index]?.token);
		}
		this.processNestedArguments(task);
		let [name, ...args] = task.argumentValues();
		return `new ${name}(${args.join(",")})`;
	}
}
