import fs from "fs";
import path from "path";
import resizeImg from "resize-img";
import { regExp } from "./regExp";

// file name
const filename = (file: any) => file.filename;

// slug name
const slugname = (slug: string) => slug.replace(/\s+/g, "-");

// token expiration date
const tokenExpireDate = (time: number = 1): Date => {
  const date = new Date(Date.now());
  date.setHours(date.getHours() + time);
  return date;
};

// file filter
const filterFile = (req: Request, file: any, cb: Function) => {
  if (!file.originalname.match(regExp.imgReg)) {
    return cb(
      new Error("Please upload file in these formats (jpe?g|png|giff|jfif|pmp)")
    );
  }
  return cb(null, true);
};

// delete file
const deleteFile = (dirPath: string) => {
  if (fs.existsSync(dirPath)) {
    fs.unlink(dirPath, (err: any) => {
      if (err) new Error(err);
    });
  }
};

const resizeImage = async (dir: string, width: number, height: number) => {
  if (fs.existsSync(dir)) {
    const image = await resizeImg(fs.readFileSync(dir), {
      width: width,
      height: height,
    });
    fs.writeFileSync(dir, image);
  }
};

// NO IMAGE
const noImage = (folder: string, p: any) => {
  return p
    ? "http://localhost:4200/" + folder + path.basename(p)
    : "http://localhost:4200/images/noimage.jpg";
};
// export
export {
  slugname,
  tokenExpireDate,
  filename,
  filterFile,
  deleteFile,
  resizeImage,
  noImage,
};
