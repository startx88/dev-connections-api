declare const filename: (file: any) => any;
declare const slugname: (slug: string) => string;
declare const tokenExpireDate: (time?: number) => Date;
declare const filterFile: (req: Request, file: any, cb: Function) => any;
declare const docFileFilter: (req: Request, file: any, cb: Function) => any;
declare const deleteFile: (dirPath: string) => void;
declare const resizeImage: (dir: any, width: number, height: number) => Promise<void>;
declare const noImage: (folder: string, p: any) => string;
export { slugname, tokenExpireDate, filename, filterFile, deleteFile, resizeImage, noImage, docFileFilter, };
