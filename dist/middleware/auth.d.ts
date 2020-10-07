import { NextFunction, Request, Response } from "express";
declare const auth: (req: Request, res: Response, next: NextFunction) => void;
export { auth };
