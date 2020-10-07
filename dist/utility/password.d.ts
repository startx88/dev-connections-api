export declare class Password {
    static toHash(password: string): Promise<string>;
    static toCompare(password: string, hashPassword: string): Promise<boolean>;
}
