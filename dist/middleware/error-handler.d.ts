import { Request, Response, NextFunction } from "express";
declare const errorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => Response<any> | undefined;
export { errorHandler };
