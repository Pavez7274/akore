import { Compiler, Task, TaskArgument } from "./compiler";
import { Dirent, readdirSync } from "fs";
import { TokenArgument } from "./lexer";

export const enum InstructionStatus {
	Enabled = "ENABLED",
	Disabled = "DISABLED",
}

function isOperator(input: string, index: number): boolean {
	const operators = ["!==", "!=", "===", "&&", "||", "==", ">=", "<=", "<", ">"];
	for (const op of operators) {
		if (input.startsWith(op, index)) {
			return true;
		}
	}
	return false;
}

export abstract class Instruction {
	abstract readonly name: string;
	abstract readonly id: string;
	public status: InstructionStatus = InstructionStatus.Enabled;

	constructor(public readonly compiler: Compiler) {}

	public abstract compile(task: Task): string;

	public buildConditionArgument(arg: TokenArgument | undefined): string {
		if (!arg) return "";

		let result = "";
		let current = "";
		let depth = 0;

		for (let i = 0; i < arg.value.length; i++) {
			const char = arg.value[i];

			if (char === "[") {
				current += char;
				depth++;
			} else if (char === "]" && depth) {
				current += char;
				depth--;
			} else if (char === " " && !depth) {
				// ignore spaces
			} else if (isOperator(arg.value, i)) {
				result += this.buildString(current.trim(), arg);
				result += arg.value.substring(i, i + (arg.value[i + 1] === "=" ? 3 : 2));
				current = "";
				i += arg.value[i + 1] === "=" ? 2 : 1;
			} else if (char === "(" || char === ")" || char === "!") {
				result += this.buildString(current.trim(), arg) + char;
				current = "";
			} else {
				current += char;
			}
		}
		result += this.buildString(current.trim(), arg);

		return (arg.value = result);
	}

	public buildStringArgument(arg: TokenArgument | undefined): string {
		if (!arg) return "";
		if (!isNaN(Number(arg.value))) return arg.value;
		if (arg.nested.length === 1 && arg.nested[0]?.total === arg.value) return arg.value;
		if (arg.nested.length === 0) return (arg.value = '"' + arg.value + '"');
		let nestedIndex = 0;
		let result = "";
		for (let i = 0; i < arg.value.length; i++) {
			const nested = arg.nested[nestedIndex];
			if (nested && nested.start === i) {
				result += "${" + nested.total + "}";
				i = nested.end - 1;
				nestedIndex++;
			} else {
				result += arg.value[i];
			}
		}
		return (arg.value = "`" + result + "`");
	}

	public buildStringArguments(taskArgument: TaskArgument[]) {
		for (const arg of taskArgument) {
			this.buildStringArgument(arg.value);
		}
	}

	public processNestedArgument(arg: TaskArgument): string {
		if (arg) {
			let value = arg.value.value;
			for (const nested of arg.nested) {
				if (nested) {
					value = value.replace(nested.token.total, nested.compile());
				}
				if (value !== arg.value.value) {
					arg.value.value = value;
				}
			}
		}
		return arg.value.value;
	}

	public processNestedArguments(task: Task): void {
		for (const arg of task.arguments) {
			this.processNestedArgument(arg);
		}
	}

	public buildString(input: string, arg: TokenArgument): string {
		if (!isNaN(Number(input))) return input;

		const nesteds = arg.nested
			.filter((nested) => input.includes(nested.total))
			.map((nested) => ({
				...nested,
				start: input.indexOf(nested.total),
				end: input.indexOf(nested.total) + nested.total.length,
			}));

		if (nesteds.length === 1 && nesteds[0]?.total.trim() === input) return input;
		if (nesteds.length === 0) return (input = '"' + input + '"');
		let result = "";
		let nestedIndex = 0;
		for (let i = 0; i < input.length; i++) {
			const nested = nesteds[nestedIndex];
			if (nested && nested.start === i) {
				result += "${" + nested.total + "}";
				i = nested.end - 1;
				nestedIndex++;
			} else {
				result += input[i];
			}
		}

		return (input = "`" + result + "`");
	}

	public enable() {
		this.status = InstructionStatus.Enabled;
	}

	public disable() {
		this.status = InstructionStatus.Disabled;
	}
}

export class InstructionsManager {
	#instructions: Instruction[] = [];

	public get instructions(): Instruction[] {
		return this.#instructions;
	}

	public add(...instructions: Instruction[]) {
		this.#instructions.push(...instructions);
	}

	public load(mod: string, compiler: Compiler) {
		function getFiles(mod: string, result: Dirent[] = []) {
			const files = readdirSync(mod, { withFileTypes: true });
			for (const file of files) {
				file.name = `${mod}/${file.name}`;
				file.isDirectory() ? getFiles(file.name, result) : result.push(file);
			}
			return result;
		}

		for (const file of getFiles(mod).filter((el) => el.name.endsWith(".js"))) {
			const imported = require(file.name) as {
				default: new (compiler: Compiler) => Instruction;
			};
			this.add(new imported.default(compiler));
		}
	}
}
