import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

class requestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("validation error");
    Object.setPrototypeOf(this, CustomError);
  }

  errorMessage() {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}

export { requestValidationError };
