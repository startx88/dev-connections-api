import { NextFunction, Request, Response } from "express";
import { AuthenticationError, BadRequestError } from "../errors";
import { User, UserAttr } from "../models/user";

// authentication
const Permission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.currentUser?.id);
    if (user?.role !== "admin") {
      throw new BadRequestError("You have no permission to perform this task.");
    }
  } catch (err) {
    throw next(err);
  }
};

export { Permission };
