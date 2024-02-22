import { Instruction, InstructionsManager } from "./instruction";
import { TokenArgument, Token } from "./lexer";
export interface TaskArgument {
    value: TokenArgument;
    nested: Task[];
}
export declare class Task {
    readonly token: Token;
    readonly instruction: Instruction;
    readonly compiler: Compiler;
    arguments: TaskArgument[];
    constructor(token: Token, instruction: Instruction, compiler: Compiler);
    argValues(): string[];
    compile(): string;
}
export declare class Compiler {
    #private;
    instructionsManager: InstructionsManager;
    private lexer;
    busy: boolean;
    constructor(input: string, instructionsManager?: InstructionsManager);
    get output(): string;
    get input(): string;
    createTasksFromTokens(tokens: Token[]): Task[];
    findInstructionForToken(token: Token): Instruction | undefined;
    appendToOutput(value: string): void;
    prependToOutput(value: string): void;
    insertAtLine(lineNumber: number, value: string): void;
    insertAtPosition(position: number, value: string): void;
    compile(): string | undefined;
}
