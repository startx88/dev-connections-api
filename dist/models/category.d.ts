import mongoose from "mongoose";
interface CatAttrs {
    title: string;
    slug: string;
    image?: string;
    description?: string;
    active?: boolean;
    insertAt?: Date;
}
export interface CatDoc extends mongoose.Document {
    title: string;
    slug: string;
    image?: string;
    description?: string;
    active?: boolean;
    insertAt?: Date;
}
interface CatModel extends mongoose.Model<CatDoc> {
    build(attr: CatAttrs): CatDoc;
}
declare const Category: CatModel;
export { Category };
