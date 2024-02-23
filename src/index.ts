import { default as FunctionInstruction } from "./instructions/function";
import { default as ImportInstruction } from "./instructions/import";
import { default as ExportInstruction } from "./instructions/export";
import { default as PrintInstruction } from "./instructions/print";
import { default as WhileInstruction } from "./instructions/while";
import { default as NullInstruction } from "./instructions/null";
import { default as GetInstruction } from "./instructions/get";
import { default as SumInstruction } from "./instructions/sum";
import { default as VarInstruction } from "./instructions/var";
import { default as IfInstruction } from "./instructions/if";

export const BasicInstructions = {
	FunctionInstruction,
	ImportInstruction,
	ExportInstruction,
	PrintInstruction,
	WhileInstruction,
	NullInstruction,
	GetInstruction,
	SumInstruction,
	VarInstruction,
	IfInstruction,
};

export * from "./classes/instruction";
export * from "./classes/compiler";
export * from "./classes/logger";
export * from "./classes/lexer";
