import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { defautlConfig } from "../config";
import { AuthenticationError } from "../errors";

// jwt response
interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const currentUser = (req: Request, res: Response, next: NextFunction) => {
  const header = req.get("Authorization");

  // header
  if (!header) {
    throw new AuthenticationError();
  }

  // get token
  const token = header.split(" ")[1];

  let verify = null;
  try {
    verify = jwt.verify(token, defautlConfig.SECRET_KEY) as UserPayload;
  } catch (err) {
    throw new AuthenticationError();
  }
  req.user = verify;
  if (!verify) {
    throw new AuthenticationError();
  }
  // assign logged in user value
  next();
};

export { currentUser };
