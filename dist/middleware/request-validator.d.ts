import { NextFunction, Request, Response } from "express";
declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
export { validateRequest };
