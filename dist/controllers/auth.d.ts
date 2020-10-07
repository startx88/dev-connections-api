import { NextFunction, Request, Response } from "express";
/**
 * User registration
 * @param req
 * @param res
 * @param next
 */
declare const userSignup: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const userSignin: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * User verify via email
 * @param req
 * @param res
 * @param next
 */
declare const activateAccount: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Resend Email if token expire
 * @param req
 * @param res
 * @param next
 */
declare const resendEmail: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Forgot password
 * @param req
 * @param res
 * @param next
 */
declare const forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * reset user password
 * @param req
 * @param res
 * @param next
 */
declare const getReset: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const postReset: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * change user password
 * @param req
 * @param res
 * @param next
 */
declare const changePassword: (req: Request, res: Response, next: NextFunction) => void;
export { userSignup, userSignin, activateAccount, resendEmail, getReset, postReset, forgotPassword, changePassword, };
