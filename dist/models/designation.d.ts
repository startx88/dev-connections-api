import mongoose from "mongoose";
export interface DesignationAttr {
    title: string;
    slug: string;
    active?: boolean;
    insertAt?: Date;
}
export interface DesignationDoc extends mongoose.Document {
    title: string;
    slug: string;
    active?: boolean;
    insertAt?: Date;
}
interface SkillModel extends mongoose.Model<DesignationDoc> {
    build(attr: DesignationAttr): DesignationDoc;
}
declare const Designation: SkillModel;
export { Designation };
