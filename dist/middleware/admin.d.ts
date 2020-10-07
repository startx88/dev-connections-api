import { NextFunction, Request, Response } from "express";
declare const admin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { admin };
