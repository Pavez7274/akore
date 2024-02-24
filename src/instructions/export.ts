import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class ExportInstruction extends Instruction {
	override name = "$export" as const;
	override id = "$akitaExport" as const;
	public override compile(task: Task): string {
		this.processNestedArguments(task);
		const [name, value] = task.argValues<[string, string]>();
		return `exports${name ? `.${name}` : ""} = ${value}`;
	}
}
