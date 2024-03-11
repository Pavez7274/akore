import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class ExportInstruction extends Instruction {
	override name = "$export" as const;
	override id = "$akoreExport" as const;
	public override compile(task: Task): string {
		this.processNestedArguments(task);
		const [name, value] = task.argumentValues<[string, string]>();
		return `exports${name ? `.${name}` : ""} = ${value}`;
	}
}
