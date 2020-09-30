abstract class CustomError extends Error {
  // abstract variable to hold status code
  abstract statusCode: number;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError);
  }

  // abstract method
  abstract errorMessage(): { message: string; field?: string }[];
}

// export
export { CustomError };
