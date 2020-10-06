import express, { Request, Response, NextFunction } from "express";
import path from "path";
import "express-async-errors";
import { connectDb } from "./db";
import { cors, errorHandler } from "./middleware";
import { authRouter } from "./routes/auth";
import { profileRouter } from "./routes/profile";
import { skillRouter } from "./routes/skill";
import { NotFoundError } from "./errors";
// app
const app = express();

// constant
app.set("title", "shopkart-api");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.resolve(__dirname, "..", "public")));

// cors

const {
  PORT = process.env.PORT || 4200,
  SECRET_KEY = process.env.SECRET_KEY,
} = process.env;

app.use(cors);

app.use((req, res, next) => {
  if ("production" === app.get("env")) {
    res.locals.localURL = "https://dev-connections-api.herokuapp.com";
  } else {
    res.locals.localURL = "http://localhost:4200";
  }
  next();
});

if (app.get("env")) {
  app.get("/template", (req, res, next) => {
    res.render("confirm", {
      title: "Forgot password",
      year: new Date().getFullYear(),
      token: "dfasdfasdfdf",
      userId: "fjdsklfjd",
      fullname: "Pradeep Kumar",
    });
  });
}

// routes
// routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/skill", skillRouter);

// error handler
// Error
app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  throw next(new NotFoundError("Not found"));
});

app.use(errorHandler);

// listen

connectDb(() => {
  app.listen(PORT, () => {
    console.log("Server is running...", PORT);
  });
});