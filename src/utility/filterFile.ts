import { FileFilterCallback } from "multer";

export class FilterFile {
  constructor(public regExp: string, public message: string) {}
  // filter file
  fileFilter(req: Request, file: any, cb: FileFilterCallback) {
    if (!file.originalname.match(this.regExp)) {
      return cb(new Error(this.message));
    }

    return cb(null, true);
  }
}
