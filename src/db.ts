import mongoose from "mongoose";
import { defautlConfig } from "./config";
import { DatabaseConnectionError } from "./errors";


console.log('config', defautlConfig.DB)
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
    new DatabaseConnectionError();
  }
};

// export
export { connectDb };
