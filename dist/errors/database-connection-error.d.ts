import { CustomError } from "./custom-error";
declare class DatabaseConnectionError extends CustomError {
    statusCode: number;
    reason: string;
    constructor();
    errorSerialize(): {
        message: string;
    }[];
}
export { DatabaseConnectionError };
