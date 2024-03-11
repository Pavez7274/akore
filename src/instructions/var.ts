import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class VarInstruction extends Instruction {
	override name = "$var" as const;
	override id = "$akoreVar" as const;

	public override compile(task: Task): string {
		this.buildStringArgument(task.arguments[1]?.token!);
		this.processNestedArguments(task);

		let [key, value] = task.argumentValues() as [string, string];

		if ((value && value?.startsWith("+")) || value?.startsWith("-")) {
			const operator = value.startsWith("+") ? "+" : "-";
			const numberValue = parseInt(value.slice(1), 10);
			if (!isNaN(numberValue)) {
				if (![...this.compiler.variables].some((x) => x.key === key)) {
					this.compiler.variables.add({ key: key, value: "0" });
				}
				return `${key}${operator}=${numberValue}`;
			}
			this.compiler.addVariable(false, key.split(".")[0]!);
			return `${key}${operator}=${value}`;
		} else {
			this.compiler.addVariable(false, key.split(".")[0]!);
			return value ? `${key}=${value}` : key;
		}
	}
}
