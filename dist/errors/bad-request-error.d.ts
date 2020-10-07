import { CustomError } from "./custom-error";
declare class BadRequestError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    errorSerialize(): {
        message: string;
    }[];
}
export { BadRequestError };
