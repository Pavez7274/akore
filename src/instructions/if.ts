import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class IfInstruction extends Instruction {
	override name = "$if" as const;
	override id = "$akitaIf" as const;
	public override compile(task: Task): string {
		this.buildConditionArgument(task.arguments[0]?.token);
		this.processNestedArguments(task);

		const [condition, whenTrue, whenFalse] = task.argValues() as [
			string,
			string,
			string | undefined
		];
		return `if (${condition}) {${whenTrue}}${whenFalse ? `else {${whenFalse}}` : ""}`;
	}
}
