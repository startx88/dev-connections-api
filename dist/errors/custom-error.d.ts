declare abstract class CustomError extends Error {
    message: string;
    abstract statusCode: number;
    constructor(message: string);
    abstract errorSerialize(): {
        message: string;
        field?: string;
    }[];
}
export { CustomError };
