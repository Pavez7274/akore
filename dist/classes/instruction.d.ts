import { Compiler, Task, TaskArgument } from "./compiler";
import { TokenArgument } from "./lexer";
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
    readonly compiler: Compiler;
    abstract readonly name: string;
    abstract readonly id: string;
    status: InstructionStatus;
    constructor(compiler: Compiler);
    abstract compile(task: Task): string;
    /**
     * Validates the number of arguments and processes each argument based on its type.
     * @param args - The array of arguments to be processed.
     * @param min - The minimum number of arguments required.
     * @param types - The types of arguments.
     */
    validateAndProcessArguments(args: TaskArgument[], min: number, ...types: ArgumentTypes[]): void;
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
    buildStringArgument(arg: TokenArgument | undefined, input?: string): string;
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
    /**
     * Builds a boolean argument by processing the given token argument.
     * @param {TokenArgument | undefined} arg The token argument to be processed.
     * @returns {string} The processed boolean value.
     */
    buildBooleanArgument(arg: TokenArgument | undefined): "true" | "false";
    /**
     * Builds number arguments by processing each token in the given array of task arguments.
     * @param {TaskArgument[]} args Array of task arguments containing tokens to be processed.
     */
    buildBooleanArguments(args: TaskArgument[]): void;
    /**
     * Processes nested arguments within the given task argument, replacing nested tokens with their compiled values.
     *
     * @param {TaskArgument} arg The task argument to process.
     * @returns {string} The processed value of the task argument.
     */
    processNestedArgument(arg?: TaskArgument): string;
    /**
     * Processes nested arguments within the given task, replacing nested tokens with their compiled values.
     * @param {Task} task The task whose arguments are to be processed.
     */
    processNestedArguments(task: Task): void;
    /**
     * Enables the instruction
     */
    enable(): void;
    /**
     * Disables the instruction
     */
    disable(): void;
}
export declare class InstructionsManager {
    #private;
    get instructions(): Instruction[];
    add(...instructions: Instruction[]): void;
    loaddir(mod: string, compiler: Compiler): boolean;
}
