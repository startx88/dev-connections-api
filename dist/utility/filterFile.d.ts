import { FileFilterCallback } from "multer";
export declare class FilterFile {
    regExp: string;
    message: string;
    constructor(regExp: string, message: string);
    fileFilter(req: Request, file: any, cb: FileFilterCallback): void;
}
