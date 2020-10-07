import { NextFunction, Request, Response } from "express";
declare const Permission: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { Permission };
