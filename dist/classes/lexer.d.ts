export interface TokenArgument {
    value: string;
    nested: Token[];
}
export interface Token {
    name: string;
    total: string;
    start: number;
    end: number;
    arguments: TokenArgument[];
}
export declare class Lexer {
    #private;
    constructor(input: string);
    get position(): number;
    get input(): string;
    tokenize(): Token[];
    private getPreviuosChar;
    private getCurrentChar;
    ended(): boolean;
    private parseArguments;
    private tokenizeFunction;
    setInput(input: string): void;
    advance(steps: number): void;
    retract(steps: number): void;
    substring(start: number, end: number): string;
}
