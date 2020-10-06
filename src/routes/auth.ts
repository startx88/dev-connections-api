import express from "express";
import {
  userSignup,
  userSignin,
  activateAccount,
  resendEmail,
  getReset,
  postReset,
  forgotPassword,
  changePassword,
} from "../controllers/auth";
import { User } from "../models/user";
import { body, oneOf } from "express-validator";
import { auth, currentUser, validateRequest } from "../middleware";
import {
  signupSchema,
  signinSchema,
  forgotSchema,
  newPasswordSchema,
} from "./schema";

// route
const route = express.Router();

/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/api/auth/signup
 * ACCESS           :  PUBLIC
 */
route.post("/signup", signupSchema, validateRequest, userSignup);

/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/auth/signup
 * ACCESS           :  PUBLIC
 */
route.post("/", signinSchema, validateRequest, userSignin);

/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/auth/signup
 * ACCESS           :  PUBLIC
 */
route.get("/verify-email/:token", signinSchema, activateAccount);

/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/auth/resend-verification-email
 * ACCESS           :  PUBLIC
 */
route.post(
  "/resend-verification-email",
  currentUser,
  auth,
  signinSchema,
  resendEmail
);

/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/auth/signup
 * ACCESS           :  PUBLIC
 */
route.post("/forgot-password", forgotSchema, validateRequest, forgotPassword);

/**
 * Reset password route
 * METHOD           :  GET
 * URL              :  http://localhost:4200/auth/reset
 * ACCESS           :  PUBLIC
 */

route.get("/reset/:token", getReset);

route.post("/new-password", newPasswordSchema, validateRequest, postReset);

// export route
export { route as authRouter };
