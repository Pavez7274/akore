import { Instruction } from "../classes/instruction";
import { Task } from "../classes/compiler";

export default class ImportInstruction extends Instruction {
	override name = "$import" as const;
	override id = "$akitaImport" as const;

	public override compile(task: Task): string {
		this.processNestedArguments(task);

		let [module, name = module] = task.argValues() as [string, string | undefined];

		try {
			if (typeof JSON.parse(name) !== "object") name = name.trim().replace(/[^A-z_]/g, "_");
		} catch {
			name = name.trim().replace(/[^A-z_]/g, "_");
		}

		if (!this.compiler.vars.includes(`var ${name} = require("${module}");`)) {
			this.compiler.vars.push(`var ${name} = require("${module}");`);
		}

		return name;
	}
}
