import mongoose from "mongoose";
const Schema = mongoose.Schema;

// roles
enum Role {
  user,
  admin,
}

// user attributes
interface UserAttrs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  role?: Role;
  verify?: boolean;
  token?: string;
  expireToken?: Date;
  active?: boolean;
  insertAt?: Date;
}

// user doc
interface UserDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  role?: Role;
  verify?: boolean;
  token?: string;
  expireToken?: Date;
  active?: boolean;
  insertAt?: Date;
}

// user model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// user schema
const userSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0, enum: Role },
    mobile: { type: String, required: true, unique: true, index: true },
    verify: { type: Boolean, default: false },
    token: { type: String },
    expireToken: { type: Date },
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

// create build user method
userSchema.statics.build = (attr: UserAttrs) => {
  return new User(attr);
};

// user model
const User = mongoose.model("User", userSchema);

// export
export { User };
