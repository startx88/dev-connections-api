import mongoose from "mongoose";
import { UserAttr, UserDoc } from "./user";

// profile schema
const Schema = mongoose.Schema;

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

// experience interface
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
  college: string; // kic
  course: string; // BCA
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

// user attributes
interface ProfileAttr {
  user: string; // pradeep kumar
  status: string; // i love coding
  company: string; // rsystems
  designation: string; // sr. software engineer
  experience: string; // 6.5 years
  salary: string; // 8.5 lac
  website: string; // https://www.google.com
  location: string; // delhi
  qualification: string;
  languages: ILanguage[];
  skills: ISkill[]; // html, css, js, react, vue
  avatar: string;
  dob: Date;
  gender: string;
  resume?: string;
  hobbies?: string[];
  summary?: string; // this is my first project
  gitusername?: string; // startx88
  noticeperiod?: string;
  employment?: IEmployment[];
  education?: IEducation[];
  active?: boolean;
  insertAt?: Date;
}

// profile document
export interface ProfileDoc extends mongoose.Document {
  user: string; // pradeep kumar
  status: string; // i love coding
  company: string; // rsystems
  designation: string; // sr. software engineer
  experience: string; // 6.5 years
  salary: string; // 8.5 lac
  website: string; // https://www.google.com
  location: string; // delhi
  qualification: string;
  languages: ILanguage[];
  skills: ISkill[]; // html, css, js, react, vue
  avatar: string;
  dob: Date;
  gender: string;
  resume?: string;
  hobbies?: string[];
  summary?: string; // this is my first project
  gitusername?: string; // startx88
  noticeperiod?: string;
  employment?: IEmployment[];
  education?: IEducation[];
  active?: boolean;
  insertAt?: Date;
}

// profile model
interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attr: ProfileAttr): ProfileDoc;
}

// Profile Schema
const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Welcome to dev connections" },
  company: { type: String, required: true },
  designation: { type: String, required: true },
  experience: { type: String, required: true },
  salary: { type: String, required: true },
  website: { type: String },
  location: { type: String, required: true },
  qualification: { type: String, required: true },
  languages: [
    {
      code: { type: String },
      name: { type: String },
      options: { type: [String] },
    },
  ],
  skills: [
    {
      title: { type: String },
      proficiency: {
        type: String,
        default: "beginer",
        enum: ["beginer", "intermediate", "expert"],
      },
      rating: {
        type: Number,
        default: 0,
        enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    },
  ],
  avatar: { type: String },
  dob: { type: String },
  gender: {
    type: String,
    required: true,
    default: "unknown",
    enum: ["male", "female", "unknown"],
  },
  resume: { type: String },
  hobbies: { type: [String] },
  summary: { type: String },
  gitusername: { type: String },
  noticeperiod: { type: String },
  employment: [
    {
      designation: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },
      salary: { type: String, required: true },
      skills: { type: [String], default: [] },
      description: { type: String, default: "" },
      award: [{
        title: String,
        rating: Number,
        image: String,
      }],
      from: { type: Date, default: Date.now },
      to: { type: Date, default: null },
      current: Boolean,
    },
  ],
  education: [
    {
      college: { type: String, required: true }, // kic
      course: { type: String, required: true }, // BCA
      subject: { type: [String], required: true },
      board: { type: String, default: "" },
      medium: { type: String, default: "" },
      totalMarks: { type: String, default: 0 },
      from: { type: Date, default: Date.now },
      to: { type: Date, default: null },
      current: { type: Boolean, default: false },
      description: { type: String, default: "" },
    },
  ],
  active: { type: Boolean, default: true },
  insertAt: { type: Date, default: Date.now },
});

// scatic methods
ProfileSchema.statics.build = (attr: ProfileAttr) => {
  return new Profile(attr);
};

// export model
const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  "Profile",
  ProfileSchema,
);

// export
export { Profile };
