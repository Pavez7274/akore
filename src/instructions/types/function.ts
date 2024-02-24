import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class FunctionInstruction extends Instruction {
	override name = "$function" as const;
	override id = "$akitaFunction" as const;
	public override compile(task: Task): string {
		this.processNestedArguments(task);

		const [name, args, code] = task.argValues() as [string, string, string | undefined];
		return `function ${name}(${args}) {${code}}`;
	}
}
