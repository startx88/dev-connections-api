import { NextFunction, Request, Response } from "express";
/**
 * Get all skills
 * */
declare const getSkills: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get all skills
 * */
declare const addUpdateSkill: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get all skills
 * */
declare const deleteSkill: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get all skills
 * */
declare const activeSkill: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
/**
 * Get all skills
 * */
declare const deactiveSkill: (req: Request, res: Response, next: NextFunction) => Promise<Response<any>>;
export { getSkills, addUpdateSkill, deleteSkill, activeSkill, deactiveSkill };
