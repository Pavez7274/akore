import type { Transpiler } from "./transpiler";
import type { Token } from "./lexer";
import type { Nodes } from "./nodes";
import { getFiles } from "../helpers";

/**
 * @deprecated
 */
export enum ArgumentTypes {
	ANY,
	TEXT,
	NUMBER,
	REGEXP,
	OBJECT,
	ARRAY,
	CONDITION,
	NONE,
}

export const enum InstructionStatus {
	Disabled = "DISABLED",
	Enabled = "ENABLED",
}

export abstract class Instruction {
	abstract readonly name: string;
	abstract readonly id: string;
	public status: InstructionStatus = InstructionStatus.Enabled;

	constructor(public readonly transpiler: Transpiler) {}

	public abstract parse(token: Token): Promise<Nodes.Node>;

	/**
	 * Enables the instruction
	 */
	public enable(): void {
		this.status = InstructionStatus.Enabled;
	}

	/**
	 * Disables the instruction
	 */
	public disable(): void {
		this.status = InstructionStatus.Disabled;
	}
}

export class Manager {
	#instructions: Instruction[] = [];

	public get instructions(): Instruction[] {
		return this.#instructions;
	}

	public disable(...names: string[]) {
		for (const n of names) {
			const i = this.#instructions.findIndex(({ name, id }) => id === n || name === n);
			if (i !== -1) this.#instructions[i]?.disable();
		}
	}

	public add(...instructions: Instruction[]) {
		this.#instructions.push(...instructions);
	}

	public loaddir(mod: string, compiler: Transpiler): boolean {
		const copy = [...this.#instructions];
		for (const file of getFiles(mod).filter(el => el.endsWith(".js"))) {
			const imported = require(file);
			if ("default" in imported && imported.default?.prototype instanceof Instruction) {
				this.add(new imported.default(compiler));
			}
		}

		return this.#instructions !== copy;
	}
}
