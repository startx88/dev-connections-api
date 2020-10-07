import { NextFunction, Request, Response } from "express";
declare const removeMultiplePost: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const deletePostById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const postActiveDeactive: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const deletePostComment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
declare const rejectPostComment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export { deletePostById, deletePostComment, rejectPostComment, postActiveDeactive, removeMultiplePost, };
