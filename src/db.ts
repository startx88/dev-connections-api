import mongoose from "mongoose";
import { defautlConfig } from "./config";

// database connection
const connectDb = async (cb: Function) => {
  try {
    await mongoose.connect(defautlConfig.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DATABASE CONNECTED");
    if (cb) {
      cb();
    }
  } catch (err) {
    console.log("db error", err);
  }
};

// export
export { connectDb };
