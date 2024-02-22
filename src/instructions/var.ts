import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class VarInstruction extends Instruction {
	override name = "$var" as const;
	override id = "$akitaVar" as const;

	public override compile(task: Task): string {
		this.buildStringArgument(task.arguments[1]?.value);
		this.processNestedArguments(task);

		let [name, value] = task.argValues() as [string, string];

		if ((value && value?.startsWith("+")) || value?.startsWith("-")) {
			const operator = value.startsWith("+") ? "+" : "-";
			const numberValue = parseInt(value.slice(1), 10);
			if (!isNaN(numberValue)) {
				return `${name} ${operator}= ${numberValue}`;
			}
			return `${name} ${operator}= ${value}`;
		} else {
			if (!this.compiler.output.includes(`var ${name};`)) {
				this.compiler.prependToOutput(`var ${name};`);
			}
			return value ? `${name} = ${value}` : name;
		}
	}
}
