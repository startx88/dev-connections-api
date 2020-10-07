import mongoose from "mongoose";
export interface UserAttr {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    mobile: string;
    role: string;
    verify?: Boolean;
    token?: string;
    expireToken?: Date;
    active?: boolean;
}
export interface UserDoc extends mongoose.Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    mobile: string;
    role: string;
    verify?: Boolean;
    token?: string;
    expireToken?: Date;
    active?: boolean;
}
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttr): UserDoc;
    generateToken(): string;
}
declare const User: UserModel;
export { User };
