import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";
declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    statusCode: number;
    constructor(errors: ValidationError[]);
    errorSerialize(): {
        message: any;
        field: string;
    }[];
}
export { RequestValidationError };
