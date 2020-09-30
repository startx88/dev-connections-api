import express from "express";
import path from "path";
import { connectDb } from "./db";
import { cors } from "./middleware/cors";
import { authRouter } from "./routes/auth";

// app
const app = express();
app.set("title", "shopkart-api");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.resolve(__dirname, "..", "public")));

// cors
app.use(cors);

// default route

const {
  PORT = process.env.PORT || 4200,
  SECRET_KEY = process.env.SECRET_KEY,
} = process.env;

// routes
app.use("/api/auth", authRouter);

// listen

connectDb(() => {
  app.listen(PORT, () => {
    console.log("Server is running...", PORT);
  });
});
