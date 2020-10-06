import { noImage } from "./file";

// response body
const transformRespnose = (data: any, dir?: string) => {
  if (!Array.isArray(data)) {
    delete data._doc.__v;
    return {
      ...data._doc,
      image: dir && noImage(`uploads/${dir}/`, data.image),
    };
  }
  return data.map((doc: any) => {
    delete doc._doc.__v;
    return {
      ...doc._doc,
      image: dir && noImage(`uploads/${dir}/`, doc.image),
    };
  });
};

export { transformRespnose };
