import mongoose from "mongoose";
import { UserAttr, UserDoc } from "./user";

// profile schema
const Schema = mongoose.Schema;

// experience interface
interface IExperience {
  title: string;
  company: string;
  location: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

interface IEducation {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to: Date;
  current: boolean;
  description: string;
}

// user attributes
interface ProfileAttr {
  user?: string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string[];
  bio?: string;
  gitusername?: string;
  experience?: IExperience[];
  education?: IEducation[];
  insertAt?: Date;
}

// profile document
interface ProfileDoc extends mongoose.Document {
  user?: string;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string[];
  bio?: string;
  gitusername?: string;
  experience?: IExperience[];
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
  company: { type: String },
  website: { type: String },
  location: { type: String },
  status: { type: String, required: true },
  skills: { type: [String], required: true },
  bio: { type: String },
  gitusername: { type: String },
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String },
      from: { type: Date, required: true },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String },
    },
  ],
  education: [
    {
      school: { type: String, required: true },
      degree: { type: String, required: true },
      fieldofstudy: { type: String, required: true },
      from: { type: Date, required: true },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String },
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
