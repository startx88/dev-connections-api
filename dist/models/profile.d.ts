import mongoose from "mongoose";
export interface IAward {
    title: string;
    rating: number;
    image?: string;
}
export interface ILanguage {
    code: string;
    name: string;
    options: string[];
}
export interface IEmployment {
    company: string;
    designation: string;
    skills: string[];
    location: string;
    salary: string;
    from: Date;
    award?: IAward[];
    to?: Date;
    description?: string;
    current?: boolean;
}
export interface IEducation {
    college: string;
    course: string;
    subject: string[];
    from: Date;
    to?: Date;
    board?: string;
    medium?: string;
    totalMarks?: string;
    current?: boolean;
    description?: string;
}
export interface ISkill {
    language: string;
    proficiency: string;
    rating: number;
}
interface ProfileAttr {
    user: string;
    status: string;
    company: string;
    designation: string;
    experience: string;
    salary: string;
    website: string;
    location: string;
    qualification: string;
    languages: ILanguage[];
    skills: ISkill[];
    avatar: string;
    dob: Date;
    gender: string;
    resume?: string;
    hobbies?: string[];
    summary?: string;
    gitusername?: string;
    noticeperiod?: string;
    employment?: IEmployment[];
    education?: IEducation[];
    active?: boolean;
    insertAt?: Date;
}
export interface ProfileDoc extends mongoose.Document {
    user: string;
    status: string;
    company: string;
    designation: string;
    experience: string;
    salary: string;
    website: string;
    location: string;
    qualification: string;
    languages: ILanguage[];
    skills: ISkill[];
    avatar: string;
    dob: Date;
    gender: string;
    resume?: string;
    hobbies?: string[];
    summary?: string;
    gitusername?: string;
    noticeperiod?: string;
    employment?: IEmployment[];
    education?: IEducation[];
    active?: boolean;
    insertAt?: Date;
}
interface ProfileModel extends mongoose.Model<ProfileDoc> {
    build(attr: ProfileAttr): ProfileDoc;
}
declare const Profile: ProfileModel;
export { Profile };
