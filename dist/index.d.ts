import { Instruction } from "./classes/instruction";
import { Compiler } from "./classes/compiler";
export declare const BasicInstructions: Record<string, new (compiler: Compiler) => Instruction>;
export * from "./classes/instruction";
export * from "./classes/compiler";
export * from "./classes/logger";
export * from "./classes/lexer";
