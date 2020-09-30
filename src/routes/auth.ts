import express from "express";
import {
  forgotPassword,
  userSignin,
  userSignup,
  verifyEmail,
} from "../controllers/auth";
import { User } from "../models/user";
import { body, oneOf } from "express-validator";
import { validateRquest } from "../middleware/validate-request";

// route
const route = express.Router();

/**
 * Method           POST
 * Access           Public
 * URL              http://dep-support-api.com/api/auth/signup
 */
route.post(
  "/signup",
  [
    body("firstname", "firstname is required!").notEmpty(),
    body("lastname", "lastname is required!").notEmpty(),
    oneOf([
      body("email", "email is required!").isEmail(),
      body(),
    ]),
    body("firstname", "firstname is required!").notEmpty(),
    body("firstname", "firstname is required!").notEmpty(),
  ],
  validateRquest,
  userSignup,
);

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
