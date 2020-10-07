import mongoose from "mongoose";
export interface ILike {
    user: string;
    active: boolean;
}
export interface IComments {
    _id?: string;
    user: string;
    name: string;
    message: string;
    avatar?: string;
    status: string;
    insertAt?: Date;
}
export interface PostAttr {
    category: string;
    user: string;
    title: string;
    description: string;
    image: string;
    likes?: ILike[];
    comments?: IComments[];
    active?: boolean;
    insertAt?: Date;
}
export interface PostDoc extends mongoose.Document {
    category: string;
    user: string;
    title: string;
    description: string;
    image: string;
    likes?: ILike[];
    comments?: IComments[];
    active?: boolean;
    insertAt?: Date;
}
interface PostModel extends mongoose.Model<PostDoc> {
    build(attr: PostAttr): PostDoc;
}
declare const Post: PostModel;
export { Post };
