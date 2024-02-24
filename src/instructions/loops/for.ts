import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class ForInstruction extends Instruction {
	override name = "$for" as const;
	override id = "$akitaFor" as const;
	public override compile(task: Task): string {
		this.buildConditionArgument(task.arguments[1]?.token);
		this.processNestedArguments(task);

		const [def, condition, iter, code] = task.argValues<[string, string, string, string]>();
		return `for (${def};${condition};${iter}) {${code}}`;
	}
}
