import { NextFunction, Request, Response } from "express";
/**
 * Get catgories
 */
declare const getCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Get catgories
 */
declare const addUpdateCategory: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get catgories
 */
declare const deleteCategory: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get catgories
 */
declare const activateCategory: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get catgories
 */
declare const deactivateCategory: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export { getCategories, addUpdateCategory, deleteCategory, activateCategory, deactivateCategory, };
