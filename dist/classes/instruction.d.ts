import { Compiler, Task, TaskArgument } from "./compiler";
import { TokenArgument } from "./lexer";
export declare const enum InstructionStatus {
    Enabled = "ENABLED",
    Disabled = "DISABLED"
}
export declare abstract class Instruction {
    readonly compiler: Compiler;
    abstract readonly name: string;
    abstract readonly id: string;
    status: InstructionStatus;
    constructor(compiler: Compiler);
    abstract compile(task: Task): string;
    buildConditionArgument(arg: TokenArgument | undefined): string;
    /**
     * Builds a string argument with support for nested tokens and escape characters.
     * @param arg The token argument to build.
     * @param input Optional input string to use for building.
     * @returns The built string argument.
     */
    buildStringArgument(arg: TokenArgument, input?: string): string;
    buildStringArguments(args: TaskArgument[]): void;
    buildNumberArgument(arg: TokenArgument | undefined): string;
    buildNumberArguments(args: TaskArgument[]): void;
    processNestedArgument(arg: TaskArgument): string;
    processNestedArguments(task: Task): void;
    enable(): void;
    disable(): void;
}
export declare class InstructionsManager {
    #private;
    get instructions(): Instruction[];
    add(...instructions: Instruction[]): void;
    loaddir(mod: string, compiler: Compiler): boolean;
}
