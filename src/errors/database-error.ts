import { CustomError } from "./custom-error";

class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Database connection error!";

  constructor() {
    super("Database connection failed!");
    Object.setPrototypeOf(this, DatabaseConnectionError);
  }

  errorMessage() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}

export { DatabaseConnectionError };
