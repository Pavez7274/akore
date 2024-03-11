import { Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";
import { parse } from "hjson";

function toJSON(i: string): object | unknown[] | null {
	try {
		return parse(i);
	} catch {
		return null;
	}
}

export default class ImportInstruction extends Instruction {
	override name = "$import" as const;
	override id = "$akoreImport" as const;
	public override compile(task: Task): string {
		this.processNestedArguments(task);
		let [module, key = module] = task.argumentValues() as [string, string | undefined];
		const parsed = toJSON(key);
		if (parsed !== null) {
			if (Array.isArray(parsed)) {
				this.compiler.variables = new Set(
					[...this.compiler.variables].filter((x) => !parsed.includes(x.key))
				);
				this.compiler.addVariable(true, `{${parsed.join(",")}}`, `require("${module}")`);
			} else {
				this.compiler.variables = new Set(
					[...this.compiler.variables].filter((x) => !parsed.hasOwnProperty(x.key))
				);
				this.compiler.addVariable(
					true,
					`{${Object.entries(parsed)
						.map(([k, v]) => `${k}:${v}`)
						.join(",")}}`,
					`require("${module}")`
				);
			}
			return "";
		} else {
			key = key.trim().replace(/[^A-z_]/g, "_");
			this.compiler.addVariable(true, key, `require("${module}")`);
			return key;
		}
	}
}
