import path from "path";
import { NextFunction, Request, Response } from "express";
import { AuthenticationError, BadRequestError, NotFoundError } from "../errors";
import { User, UserDoc } from "../models/user";
import {
  Mailer,
  JWT,
  Password,
  responseBody,
  tokenExpireDate,
} from "../utility";

/**
 * User registration
 * @param req 
 * @param res 
 * @param next 
 */
const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname, lastname, email, password, mobile, role } = req.body;

    // add user
    const user = User.build({
      firstname,
      lastname,
      email,
      password,
      mobile,
      role: role,
    });

    // generate token
    const jwt = new JWT(user);
    const token = jwt.generateToken();

    // expire date
    const expireTime = tokenExpireDate(1); // expire time is one hours
    user.token = token;
    user.expireToken = expireTime;

    // mailer
    Mailer.emailContainer({
      local: res.locals.localURL,
      email,
      token,
      templateName: "registration",
      user,
    });

    // save
    await user.save();
    res.status(201).send(
      responseBody({
        message: "User registerd successfully.",
        token: token,
        data: user,
      }),
    );
  } catch (err) {
    next(err);
  }
};

const userSignin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // extract info from body
    const { email, password } = req.body;

    // if user exist
    const user = await User.findOne({
      $or: [{ email: email }, { mobile: email }],
    });

    // throw error if user not found
    if (!user) {
      throw next(new NotFoundError(`User not registerd with this "${email}".`));
    }

    // verify password
    const verify = await Password.toCompare(password, user.password);
    if (!verify) {
      throw new AuthenticationError(
        "Password not match, please use valid password",
      );
    }

    // generate token
    const jwt = new JWT(user);
    const token = jwt.generateToken();

    // send response
    return res.status(200).send(
      responseBody({
        message: "User loggedin!",
        token: token,
        data: user,
      }),
    );
  } catch (err) {
    throw next(err);
  }
};

/**
 * User verify via email 
 * @param req 
 * @param res 
 * @param next 
 */

const activateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // params
    const token = req.params.token;

    // jwt token
    const jwt = new JWT();
    const tokenInfo = jwt.verifyJwtToken(token);

    // get user via token
    const user = (await User.findOneAndUpdate(
      { email: tokenInfo.email, expireToken: { $gt: new Date(Date.now()) } },
      { $set: { verify: true } },
    )) as UserDoc;

    if (user) {
      new BadRequestError("token expires, Please resend email");
    }

    res.render(path.join(__dirname, "..", "views/confirm.ejs"), {
      fullname: user.firstname + " " + user.lastname,
      url: res.locals.localURL,
    });
  } catch (err) {
    throw next(err);
  }
};

/**
 * Resend Email if token expire
 * @param req
 * @param res
 * @param next
 */

const resendEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = "req.currentUser?.id";
    const user = await User.findById(id);

    if (!user) {
      throw new AuthenticationError("User not existed!");
    }

    // jwt
    const jwt = new JWT(user);
    const token = jwt.generateToken();

    // expire time and save it to database
    const expireTime = tokenExpireDate();
    user.token = token;
    user.expireToken = expireTime;

    // send email
    Mailer.emailContainer({
      local: res.locals.localURL,
      email: user.email,
      token,
      templateName: "registration",
      user,
    });

    await user.save();

    return res
      .status(200)
      .send({ message: "Email sent!, please check your email" });
  } catch (err) {
    throw next(err);
  }
};

/**
 * Forgot password
 * @param req
 * @param res
 * @param next
 */
const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { mobile: email }],
    });

    if (!user) {
      throw new NotFoundError(`${email} not found!`);
    }

    // jwt token
    const jwt = new JWT(user);
    const token = jwt.generateToken();

    const expireTime = tokenExpireDate(); // expire in 1 hours
    user.token = token;
    user.expireToken = expireTime;

    // genere mail
    Mailer.emailContainer({
      local: res.locals.localURL,
      email: email,
      token,
      templateName: "forgot-password",
      user,
    });

    await user.save();
    return res
      .status(200)
      .send({ message: "Email sent!, Please check your email" });
  } catch (err) {
    throw next(err);
  }
};

/**
 * reset user password
 * @param req
 * @param res
 * @param next
 */
const getReset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // params
    const token = req.params.token;

    // render the template for change password
    res.render("new-password", {
      title: "Change password",
      year: new Date().getFullYear(),
      token: token,
    });
  } catch (err) {
    throw next(err);
  }
};

const postReset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      token: token,
      expireToken: { $gt: new Date(Date.now()) },
    });

    if (!user) {
      throw new AuthenticationError("Token expired!");
    }

    user.password = password;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully!",
    });
  } catch (err) {
    throw next(err);
  }
};

/**
 * change user password
 * @param req
 * @param res
 * @param next
 */
const changePassword = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;
  } catch (err) {
    throw next(err);
  }
};

// export methods
export {
  userSignup,
  userSignin,
  activateAccount,
  resendEmail,
  getReset,
  postReset,
  forgotPassword,
  changePassword,
};
