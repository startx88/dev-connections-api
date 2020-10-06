import mongoose from "mongoose";
import { UserAttr, UserDoc } from "./user";

// profile schema
const Schema = mongoose.Schema;

// experience interface
export interface IEmployment {
  designation: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
  description?: string;
  from: Date;
  to?: Date;
  current?: boolean;
}

export interface IEducation {
  college: string; // kic
  course: string; // BCA
  subject: string[];
  board?: string;
  medium?: string;
  totalMarks?: string;
  from: Date;
  to?: Date;
  current: boolean;
  description: string;
}

// user attributes
interface ProfileAttr {
  user: string; // pradeep kumar
  dob?: Date;
  designation: string; // sr. software engineer
  experience: string; // 6.5 years
  salary: string; // 8.5 lac
  company: string; // rsystems
  website: string; // https://www.google.com
  location: string; // delhi
  status: string; // i love coding
  skills: string[]; // html, css, js, react, vue
  active?: boolean;
  image?: string;
  bio?: string; // this is my first project
  gitusername?: string; // startx88
  noticeperiod?: string;
  employment?: IEmployment[];
  education?: IEducation[];
  insertAt?: Date;
}

// profile document
export interface ProfileDoc extends mongoose.Document {
  user: string; // pradeep kumar
  dob?: Date;
  designation: string; // sr. software engineer
  experience: string; // 6.5 years
  salary: string; // 8.5 lac
  company: string; // rsystems
  website: string; // https://www.google.com
  location: string; // delhi
  status: string; // i love coding
  skills: string[]; // html, css, js, react, vue
  active?: boolean;
  bio?: string; // this is my first project
  image?: string;
  gitusername?: string; // startx88
  noticeperiod?: string;
  employment?: IEmployment[];
  education?: IEducation[];
  insertAt?: Date;
}

// profile model
interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attr: ProfileAttr): ProfileDoc;
}

// Profile Schema
const ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  dob: { type: String },
  designation: { type: String, required: true },
  experience: { type: String, required: true },
  salary: { type: String },
  company: { type: String },
  website: { type: String },
  location: { type: String },
  status: { type: String, required: true },
  skills: { type: [String], required: true },
  bio: { type: String },
  gitusername: { type: String },
  noticeperiod: { type: String },
  image: String,
  employment: [
    {
      designation: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },
      salary: { type: String, required: true },
      skills: [String],
      description: String,
      from: Date,
      to: Date,
      current: Boolean,
    },
  ],
  education: [
    {
      college: { type: String, required: true }, // kic
      course: { type: String }, // BCA
      subject: [String],
      board: { type: String },
      medium: { type: String },
      totalMarks: { type: String },
      from: Date,
      to: Date,
      current: Boolean,
      description: { type: String, required: true },
    },
  ],
  insertAt: { type: Date, default: Date.now },
});

// scatic methods
ProfileSchema.statics.build = (attr: ProfileAttr) => {
  return new Profile(attr);
};

// export model
const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  "Profile",
  ProfileSchema
);

// export
export { Profile };
