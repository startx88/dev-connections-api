import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { requestValidationError } from "../errors";

// validation error
const validateRquest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new requestValidationError(errors.array());
  }
};

export { validateRquest };
