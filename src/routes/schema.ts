import { body, oneOf } from "express-validator";
import { regExp } from "../utility";
import { User } from "../models/user";
import { BadRequestError } from "../errors";

// signup schema
export const signupSchema = [
  body("firstname", "firstname is required!").notEmpty(),
  body("lastname", "lastname is required!").notEmpty(),
  body("email", "email is required")
    .isEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("User already existed");
      }
      return user;
    }),
  body("password", "password is required!")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8 to 16 char long")
    .matches(regExp.password)
    .withMessage(
      "Password must be one uppercase, one lowercase, one digit and one symbol.",
    ),
  body("mobile", "mobile is required!")
    .isLength({ min: 10, max: 10 })
    .withMessage("Password must be 10 char")
    .matches(regExp.mobile)
    .custom(async (mobile) => {
      const user = await User.findOne({ mobile });
      if (user) {
        throw new BadRequestError("Mobile already existed");
      }
      return user;
    }),
];

// signin schema
export const signinSchema = [
  oneOf([
    body("email").isEmail().withMessage("Please use valid email address"),
    body("email").isMobilePhone("en-IN"),
  ]),
  body("password", "password is required!")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8 to 16 char long")
    .matches(regExp.password)
    .withMessage(
      "Password must be one uppercase, one lowercase, one digit and one symbol.",
    ),
];

export const forgotSchema = [
  oneOf([
    body("email").isEmail().withMessage("Please use valid email address"),
    body("email").isMobilePhone("en-IN"),
  ]),
];

export const resetPasswordSchema = [
  body("password", "password is required!")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8 to 16 char long")
    .matches(regExp.password)
    .withMessage(
      "Password must be one uppercase, one lowercase, one digit and one symbol.",
    ),
];

export const newPasswordSchema = [
  body("password", "password is required!")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8 to 16 char long")
    .matches(regExp.password)
    .withMessage(
      "Password must be one uppercase, one lowercase, one digit and one symbol.",
    ),
  body("confirm-password", "confirm-password is required")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be 8 to 16 char long")
    .matches(regExp.password)
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject("Confirm password not match with password");
      }
      return true;
    }),
];
