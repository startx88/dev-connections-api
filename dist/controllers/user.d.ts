import { NextFunction, Request, Response } from "express";
/**
 * get all users
 *
 * */
declare const getUsers: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * delete user
 *
 * */
declare const deleteUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Active / Deactive user
 *
 *  */
declare const activeDeactiveUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export { getUsers, deleteUser, activeDeactiveUser };
