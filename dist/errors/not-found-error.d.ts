import { CustomError } from "./custom-error";
declare class NotFoundError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    errorSerialize(): {
        message: string;
    }[];
}
export { NotFoundError };
