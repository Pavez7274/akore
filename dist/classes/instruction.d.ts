import type { Transpiler } from "./transpiler";
import type { Token } from "./lexer";
import type { Nodes } from "./nodes";
/**
 * @deprecated
 */
export declare enum ArgumentTypes {
    ANY = 0,
    TEXT = 1,
    NUMBER = 2,
    REGEXP = 3,
    OBJECT = 4,
    ARRAY = 5,
    CONDITION = 6,
    NONE = 7
}
export declare const enum InstructionStatus {
    Disabled = "DISABLED",
    Enabled = "ENABLED"
}
export declare abstract class Instruction {
    readonly transpiler: Transpiler;
    abstract readonly name: string;
    abstract readonly id: string;
    status: InstructionStatus;
    constructor(transpiler: Transpiler);
    abstract parse(token: Token): Promise<Nodes.Node>;
    /**
     * Enables the instruction
     */
    enable(): void;
    /**
     * Disables the instruction
     */
    disable(): void;
}
export declare class Manager {
    #private;
    get instructions(): Instruction[];
    disable(...names: string[]): void;
    add(...instructions: Instruction[]): void;
    loaddir(mod: string, compiler: Transpiler): boolean;
}
