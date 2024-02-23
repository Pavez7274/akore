export declare class Logger {
    private static readonly AKITA_TAG;
    private static readonly PATH_TAG;
    static error(message: string, path?: string): never;
    static warn(message: string, path?: string): void;
    static debug(message: unknown, path?: string): void;
    static info(message: string, path?: string): void;
    private static getTag;
}
