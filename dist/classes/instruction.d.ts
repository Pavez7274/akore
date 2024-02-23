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
    buildStringArgument(arg: TokenArgument | undefined): string;
    buildStringArguments(taskArgument: TaskArgument[]): void;
    processNestedArgument(arg: TaskArgument): string;
    processNestedArguments(task: Task): void;
    buildString(input: string, arg: TokenArgument): string;
    enable(): void;
    disable(): void;
}
export declare class InstructionsManager {
    #private;
    get instructions(): Instruction[];
    add(...instructions: Instruction[]): void;
    loaddir(mod: string, compiler: Compiler): void;
}
