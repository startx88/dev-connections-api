import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

// user signup
const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

const userSignin = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

// Forgot Password
const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (err) {
    throw next(err);
  }
};

// export methods
export { userSignup, userSignin, verifyEmail, forgotPassword };
