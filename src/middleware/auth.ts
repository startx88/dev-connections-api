import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors";

// authentication
const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new AuthenticationError();
  }

  next();
};

export { auth };
