import mongoose from "mongoose";
const Schema = mongoose.Schema;

// skill attributes
export interface SkillAttr {
  title: string;
  slug: string;
  active?: boolean;
  insertAt?: Date;
}

// skill document
export interface SkillDoc extends mongoose.Document {
  title: string;
  slug: string;
  active?: boolean;
  insertAt?: Date;
}

// skill model
interface SkillModel extends mongoose.Model<SkillDoc> {
  build(attr: SkillAttr): SkillDoc;
}

// skills schema
const skillSchema = new Schema(
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
skillSchema.statics.build = (attr: SkillAttr) => {
  return new Skill(attr);
};

// skills
const Skill = mongoose.model<SkillDoc, SkillModel>("Skill", skillSchema);

export { Skill };
