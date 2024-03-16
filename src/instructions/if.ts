import { ArgumentTypes, Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class IfInstruction extends Instruction {
	override name = "$if" as const;
	override id = "$akoreIf" as const;
	public override compile(task: Task): string {
		this.validateAndProcessArguments(
			task.arguments,
			2,
			ArgumentTypes.CONDITION,
			ArgumentTypes.NONE,
			ArgumentTypes.NONE
		);
		this.processNestedArguments(task);

		const [condition, whenTrue, whenFalse] = task
			.argumentValues()
			.map((el) => el.trim().replace(/\n/g, "\n\t"));
		return `if (${condition}) {\n\t${whenTrue}\n}${whenFalse ? ` else {\n\t${whenFalse}\n}` : ""}`;
	}
}
