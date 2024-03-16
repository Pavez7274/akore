import { toValidVarName } from "../../helpers/to_valid_var_name";
import { ArgumentTypes, Instruction } from "../../classes/instruction";
import { Task } from "../../classes/compiler";

export default class ImportInstruction extends Instruction {
	override name = "$import" as const;
	override id = "$akoreImport" as const;
	public override compile(task: Task): string {
		this.validateAndProcessArguments(task.arguments, 1, ArgumentTypes.NONE, ArgumentTypes.NONE);
		this.processNestedArguments(task);
		let [module, key = module] = task.argumentValues<[string, string]>();

		if (key === module) {
			this.compiler.setVariable(module);
			this.compiler.setImport(module);
		} else if (/,/.test(key)) {
			const keys = key.split(",");
			for (let i = 0; i < keys.length; i++) {
				const e = keys[i];
				if (e) {
					if (/ as /.test(e)) {
						let [k, s] = e.split(" as ", 2) as [string, string];
						keys[i] = toValidVarName(k) + ":" + toValidVarName(s);
						this.compiler.setVariable(s);
					}
					this.compiler.setVariable(e);
					keys[i] = toValidVarName(e);
				}
			}
			this.compiler.setImport(module, ...keys);
			return "";
		} else {
			this.compiler.setVariable(module);
		}
		return toValidVarName(module);
	}
	// public override compile(task: Task): string {
	// 	this.processNestedArguments(task);
	// 	let [module, key = module] = task.argumentValues() as [string, string | undefined];
	// 	const parsed = toJSON(key);
	// 	if (parsed !== null) {
	// 		if (Array.isArray(parsed)) {
	// 			this.compiler.variables = new Set(
	// 				[...this.compiler.variables].filter((x) => !parsed.includes(x.key))
	// 			);
	// 			this.compiler.setImport(module, ...parsed.filter((x) => typeof x === "string"));
	// 			this.compiler.setVariable(true, `{${parsed.join(",")}}`, `require("${module}")`);
	// 		} else {
	// 			this.compiler.variables = new Set(
	// 				[...this.compiler.variables].filter((x) => !parsed.hasOwnProperty(x.key))
	// 			);

	// 			this.compiler.setImport(module, ...Object.entries(parsed).map(([k, s]) => `${k}: ${s}`));
	// 			this.compiler.setVariable(
	// 				true,
	// 				`{${Object.entries(parsed)
	// 					.map(([k, v]) => `${k}:${v}`)
	// 					.join(",")}}`,
	// 				`require("${module}")`
	// 			);
	// 		}
	// 		return "";
	// 	} else {
	// 		key = key.trim().replace(/[^A-z_]/g, "_");
	// 		this.compiler.setVariable(true, key, `require("${module}")`);
	// 		return key;
	// 	}
	// }
}
