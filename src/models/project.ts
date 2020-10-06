import mongoose from "mongoose";
import { UserDoc } from "./user";
const Schema = mongoose.Schema;

// attributes
interface ProjectAttr {
  user: UserDoc;
  title: string;
  description: string;
  project: string;
  active?: boolean;
  insertAt?: Date;
}

// document
interface ProjectDoc extends mongoose.Document {
  user: UserDoc;
  title: string;
  description: string;
  project: string;
  active?: boolean;
  insertAt?: Date;
}

// model
interface ProjectModel extends mongoose.Model<ProjectDoc> {
  build(attr: ProjectAttr): ProjectDoc;
}

// project schemas
const projectSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String },
    project: { type: String, required: true },
    active: { type: Boolean, default: true },
    insertAt: { type: String, default: Date.now },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

// static methods
projectSchema.statics.build = (attr: ProjectAttr) => {
  return new Project(attr);
};

// model
const Project = mongoose.model<ProjectDoc, ProjectModel>(
  "Project",
  projectSchema
);
