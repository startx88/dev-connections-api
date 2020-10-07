import { NextFunction, Request, Response } from "express";
/**
 * Get all skills
 * */
declare const getDesignations: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get all skills
 * */
declare const addUpdateDesignation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get all skills
 * */
declare const deleteDesignation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get all skills
 * */
declare const activeDesignation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get all skills
 * */
declare const deactiveDesignation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export { getDesignations, addUpdateDesignation, deleteDesignation, activeDesignation, deactiveDesignation, };
