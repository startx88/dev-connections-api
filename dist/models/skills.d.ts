import mongoose from "mongoose";
export interface SkillAttr {
    title: string;
    slug: string;
    active?: boolean;
    insertAt?: Date;
}
export interface SkillDoc extends mongoose.Document {
    title: string;
    slug: string;
    active?: boolean;
    insertAt?: Date;
}
interface SkillModel extends mongoose.Model<SkillDoc> {
    build(attr: SkillAttr): SkillDoc;
}
declare const Skill: SkillModel;
export { Skill };
