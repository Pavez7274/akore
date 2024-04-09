import { Manager } from "./instruction";
export interface TokenParameter {
    value: string;
    nested: Token[];
}
export interface Token {
    path: string;
    name: string;
    total: string;
    start: number;
    end: number;
    parameters: TokenParameter[];
}
export declare class Lexer {
    #private;
    manager: Manager;
    constructor(input: string, path: string[] | undefined, manager: Manager);
    get position(): number;
    get path(): string;
    get input(): string;
    tokenize(): Token[];
    private getPreviuosChar;
    private getCurrentChar;
    ended(): boolean;
    private parseParameters;
    private tokenizeFunction;
    setInput(input: string): void;
    advance(steps: number): void;
    retract(steps: number): void;
    substring(start: number, end: number): string;
}
