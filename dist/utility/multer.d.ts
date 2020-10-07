import multer from "multer";
declare const uploader: (dir: string, filterFiles?: any) => multer.Multer;
export { uploader };
