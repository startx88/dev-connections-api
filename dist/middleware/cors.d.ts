import { Request, Response, NextFunction } from "express";
declare const cors: (req: Request, res: Response, next: NextFunction) => void;
export { cors };
