import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({
      errors: error.errorMessage(),
    });
  }
  return res.send("something went wrong");
};

export { errorHandler };
