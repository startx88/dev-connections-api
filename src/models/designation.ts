import mongoose from "mongoose";
const Schema = mongoose.Schema;

// skill attributes
export interface DesignationAttr {
  title: string;
  slug: string;
  active?: boolean;
  insertAt?: Date;
}

// skill document
export interface DesignationDoc extends mongoose.Document {
  title: string;
  slug: string;
  active?: boolean;
  insertAt?: Date;
}

// skill model
interface SkillModel extends mongoose.Model<DesignationDoc> {
  build(attr: DesignationAttr): DesignationDoc;
}

// skills schema
const designationSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    active: { type: Boolean, default: true },
    insertAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret._doc.__v;
      },
    },
  }
);

// statics method
designationSchema.statics.build = (attr: DesignationAttr) => {
  return new Designation(attr);
};

// skills
const Designation = mongoose.model<DesignationDoc, SkillModel>(
  "Designation",
  designationSchema
);

export { Designation };
