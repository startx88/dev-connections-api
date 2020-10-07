import mongoose from "mongoose";
const Schmea = mongoose.Schema;

// category attribute
interface CatAttrs {
  title: string;
  slug: string;
  image?: string;
  description?: string;
  active?: boolean;
  insertAt?: Date;
}

// category document
export interface CatDoc extends mongoose.Document {
  title: string;
  slug: string;
  image?: string;
  description?: string;
  active?: boolean;
  insertAt?: Date;
}

// category model
interface CatModel extends mongoose.Model<CatDoc> {
  build(attr: CatAttrs): CatDoc;
}

// category schema
const categorySchema = new Schmea(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    active: { type: Boolean, default: true },
    insertAt: { type: Date, default: Date.now },
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
categorySchema.statics.build = (attr: CatAttrs) => {
  return new Category(attr);
};

// category
const Category = mongoose.model<CatDoc, CatModel>("Category", categorySchema);

// export
export { Category };
