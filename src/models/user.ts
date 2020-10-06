import mongoose from "mongoose";
import { Password } from "../utility";
import { randomBytes } from "crypto";
const Schema = mongoose.Schema;

// user interface
export interface UserAttr {
  firstname: string;
  lastname: string;
  username?: string;
  email: string;
  password: string;
  mobile: string;
  role: string;
  token?: string;
  expireToken?: Date;
  verify?: Boolean;
  avatar?: string;
  active?: boolean;
}

// doc type
export interface UserDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  username?: string;
  email: string;
  password: string;
  mobile: string;
  role: string;
  token?: string;
  expireToken?: Date;
  verify?: Boolean;
  avatar?: string;
  active?: boolean;
}

// model type
interface UserModel extends mongoose.Model<UserDoc> {
  createUser(attrs: UserAttr): UserDoc;
  generateToken(): string;
}

// user schema
const userSchema = new Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    username: { type: String, trim: true, index: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true, trim: true },
    mobile: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    token: { type: String, trim: true },
    expireToken: { type: String, trim: true },
    verify: { type: Boolean, default: false },
    avatar: { type: String, trim: true },
    active: { type: String, trim: true, default: true },
  },
  {
    toJSON: {
      transform(doc, _ret) {
        delete _ret.__v;
      },
    },
  },
);

// pre save hooks
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const password = await Password.toHash(this.get("password"));
    this.set("password", password);
  }
  const isAdmin = ["admin", "superadmin"].includes(this.get("role"))
    ? true
    : false;
  this.set("verify", isAdmin);
  done();
});

// create user
userSchema.statics.createUser = (attrs: UserAttr) => {
  return new User(attrs);
};

// generate token
userSchema.statics.generateToken = async () => {
  let token = await randomBytes(32);
  return token;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// export
export { User };
