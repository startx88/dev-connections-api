import { NextFunction, Request, Response } from "express";
/**
 * Get user profiles
 * @param req
 * @param res
 * @param next
 */
declare const getUserProfiles: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * get profile by user id
 * @param req
 * @param res
 * @param next
 */
declare const getProfileByUserId: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * fetch currently logged in user profile
 * @param req
 * @param res
 * @param next
 */
declare const getProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const addUpdateProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any> | undefined>;
declare const deleteProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const updateStatus: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const addEducation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const deleteEducation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const addEmployment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const deleteEmployment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const uploadImage: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const getGitProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const addResume: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export { getUserProfiles, getProfile, addUpdateProfile, getProfileByUserId, deleteProfile, updateStatus, addEducation, deleteEducation, addEmployment, deleteEmployment, uploadImage, getGitProfile, addResume, };
