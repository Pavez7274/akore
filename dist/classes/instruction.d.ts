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
    /**
     * Builds a condition argument by parsing and processing tokens.
     * @param {TokenArgument} arg The token argument to process.
     * @returns {string} The processed condition argument.
     */
    buildConditionArgument(arg: TokenArgument | undefined): string;
    /**
     * Builds a string argument by processing the given token argument
     * with support for nested tokens and escape characters.
     * @param arg The token argument to build.
     * @param input Optional input string to use for building.
     * @returns The built string argument.
     */
    buildStringArgument(arg: TokenArgument, input?: string): string;
    /**
     * Builds string arguments by processing each token in the given array of task arguments.
     * @param {TaskArgument[]} args Array of task arguments containing tokens to be processed.
     */
    buildStringArguments(args: TaskArgument[]): void;
    /**
     * Builds a number argument by processing the given token argument.
     * @param {TokenArgument | undefined} arg The token argument to be processed.
     * @returns {string} The processed number value.
     */
    buildNumberArgument(arg: TokenArgument | undefined): string;
    /**
     * Builds number arguments by processing each token in the given array of task arguments.
     * @param {TaskArgument[]} args Array of task arguments containing tokens to be processed.
     */
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
