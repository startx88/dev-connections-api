import mongoose from "mongoose";
import { UserAttr, UserDoc } from "./user";

// schema
const Schema = mongoose.Schema;

export interface IComments {
  user: string;
  name: string;
  message: string;
  avatar?: string;
  insertAt?: Date;
}

// post attribute
export interface PostAttr {
  user: string;
  title: string;
  description: string;
  image: string;
  likes?: { user: UserDoc; active: boolean }[];
  comments?: IComments[];
  active?: boolean;
  insertAt?: Date;
}

// Post document interface extend
export interface PostDoc extends mongoose.Document {
  user: string;
  title: string;
  description: string;
  image: string;
  likes?: { user: UserDoc; active: boolean }[];
  comments?: IComments[];
  active?: boolean;
  insertAt?: Date;
}

// Post model interface extends
interface PostModel extends mongoose.Model<PostDoc> {
  build(attr: PostAttr): PostDoc;
}

// post schema
const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        active: { type: Boolean, default: false },
      },
    ],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        message: { type: String, required: true },
        avatar: { type: String },
        insertAt: { type: Date, default: Date.now },
      },
    ],
    insertAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform(doc: PostDoc, ret: PostDoc) {
        delete ret.__v;
      },
    },
  }
);

// static methods

postSchema.statics.build = (attr: PostAttr) => {
  return new Post(attr);
};

// export schema
const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
