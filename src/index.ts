import { Instruction } from "./classes/instruction";
import { getFiles } from "./helpers/get_files";
import { Compiler } from "./classes/compiler";
import { join } from "path";

const _BasicInstructions: Record<string, new (compiler: Compiler) => Instruction> = {};
for (const file of getFiles(join(__dirname, "/instructions/")).filter((el) => el.endsWith(".js"))) {
	const imported = require(file).default as new (compiler: Compiler) => Instruction;
	_BasicInstructions[imported.name] = imported;
}

export const BasicInstructions = _BasicInstructions;
export * from "./classes/instruction";
export * from "./classes/compiler";
export * from "./classes/logger";
export * from "./classes/lexer";
