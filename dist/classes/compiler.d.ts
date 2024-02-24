import { Instruction, InstructionsManager } from "./instruction";
import { TokenArgument, Token } from "./lexer";
/**
 * Represents an argument in a compilation task.
 */
export interface TaskArgument {
    token: TokenArgument;
    nested: Task[];
}
/**
 * Represents a compilation task.
 */
export declare class Task {
    readonly token: Token;
    readonly instruction: Instruction;
    readonly compiler: Compiler;
    arguments: TaskArgument[];
    /**
     * Creates an instance of Task.
     * @param token The token associated with the task.
     * @param instruction The instruction associated with the task.
     * @param compiler The compiler instance.
     */
    constructor(token: Token, instruction: Instruction, compiler: Compiler);
    /**
     * Retrieves the values of the arguments in the task.
     * @returns An array of argument values.
     */
    argValues<T extends string[]>(): T;
    /**
     * Compiles the task.
     * @returns The compiled code for the task.
     */
    compile(): string;
}
export declare class Compiler {
    #private;
    instructionsManager: InstructionsManager;
    private lexer;
    busy: boolean;
    vars: string[];
    /**
     * Creates an instance of Compiler.
     * @param input The input code to compile.
     * @param instructionsManager The instructions manager instance.
     */
    constructor(input?: string, instructionsManager?: InstructionsManager);
    /**
     * Retrieves the compiled output.
     */
    get output(): string;
    /**
     * Retrieves the input code.
     */
    get input(): string;
    /**
     * Sets the input code for compilation.
     * @param input The input code to set.
     * @returns The Compiler instance for method chaining.
     */
    setInput(input: string): this;
    createTasksFromTokens(tokens: Token[]): Task[];
    findInstructionForToken(token: Token): Instruction | undefined;
    appendToOutput(value: string): void;
    prependToOutput(value: string): void;
    insertAtLine(lineNumber: number, value: string): void;
    insertAtPosition(position: number, value: string): void;
    /**
     * Compiles the input code.
     * @param debug Indicates whether debug mode is enabled.
     * @returns The compiled code, or void if an error occurred.
     */
    compile(debug?: boolean): Promise<string | void>;
    addInstruction(...instructions: Instruction[]): void;
    /**
     * Loads instructions from the specified directory.
     * @param path The directory path containing instruction files.
     * @returns True if the instructions were loaded successfully, otherwise false.
     */
    loaddir(path: string): boolean;
}
