import { NextFunction, Request, Response } from "express";
/**
 * get all posts
 */
declare const getPosts: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * get all posts by user id
 */
declare const getPostByUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * get logged in user post
 */
declare const getPost: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * get logged in user posts
 * @param req
 * @param res
 * @param next
 */
declare const loggedInUserPosts: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * add update post
 */
declare const addUpdatePost: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * get all posts
 */
declare const deletePost: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * get all posts
 */
declare const activatePost: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * get all posts
 */
declare const deactivatePost: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * add comment
 */
declare const addComment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * delete comment
 */
declare const deleteComment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * add comment
 */
declare const addLike: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Remove like from post
 */
declare const removeLike: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export { getPosts, getPost, getPostByUser, addUpdatePost, deletePost, activatePost, deactivatePost, addComment, deleteComment, addLike, removeLike, loggedInUserPosts, };
