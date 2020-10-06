import mongoose from "mongoose";
import { UserAttr, UserDoc } from "./user";

// schema
const Schema = mongoose.Schema;

interface IComments {
  user: UserDoc;
  name: string;
  avatar: string;
  message: string;
  insertAt?: Date;
}

// post attribute
interface PostAttr {
  user: UserDoc;
  title: string;
  description: string;
  image: string;
  likes?: { user: UserDoc; active: boolean }[];
  comments?: IComments[];
  active?: boolean;
  insertAt?: Date;
}

// Post document interface extend
interface PostDoc extends mongoose.Document {
  user: UserDoc;
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
    image: { type: String },
    active: { type: Number, default: 1 },
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        active: { type: Boolean, default: false },
      },
    ],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String },
        avatar: { type: String },
        text: { type: String, required: true },
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
