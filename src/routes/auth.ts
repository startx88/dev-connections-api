import express from "express";
import {
  forgotPassword,
  userSignin,
  userSignup,
  verifyEmail,
} from "../controllers/auth";
import { User } from "../models/user";
import { body } from "express-validator";

// route
const route = express.Router();

/**
 * Method           POST
 * Access           Public
 * URL              http://dep-support-api.com/api/auth/signup
 */
route.post("/signup", userSignup);

/**
 * Method           POST
 * Access           Public
 * URL              http://dep-support-api.com/api/auth/signup
 */
route.post("/", userSignin);

/**
 * Method           POST
 * Access           Public
 * URL              http://dep-support-api.com/api/auth/signup
 */
route.get("/verify-email", verifyEmail);

/**
 * Method           POST
 * Access           Public
 * URL              http://dep-support-api.com/api/auth/signup
 */
route.post("/forgot-password", forgotPassword);

// export route
export { route as authRouter };
