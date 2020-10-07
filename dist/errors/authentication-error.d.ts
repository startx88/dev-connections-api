import { CustomError } from "./custom-error";
declare class AuthenticationError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message?: string);
    errorSerialize(): {
        message: string;
    }[];
}
export { AuthenticationError };
