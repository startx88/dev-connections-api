import express from "express";
import { Category } from "../models/category";
import {
  getCategories,
  addUpdateCategory,
  deleteCategory,
  activateCategory,
  deactivateCategory,
} from "../controllers/category";
import { body } from "express-validator";
import { admin, auth, currentUser, validateRequest } from "../middleware";

// route
const route = express.Router();

/**
 * Method               GET
 * Access Level         Private
 * Url                  https://localhost:4200/api/category
 */
route.get("/", currentUser, auth, getCategories);

/**
 * Method               POST
 * Access Level         Private
 * Url                  https://localhost:4200/api/category
 */
route.post(
  "/:catId?",
  currentUser,
  auth,
  admin,
  [body("title", "category name is required!").notEmpty()],
  validateRequest,
  addUpdateCategory
);

/**
 * Method               Delete
 * Access Level         Private
 * Url                  https://localhost:4200/api/category
 */
route.delete("/:catId", currentUser, auth, admin, deleteCategory);

/**
 * Method               PUT
 * Access Level         Private
 * Url                  https://localhost:4200/api/category/activate
 */
route.put("/activate/:catId", currentUser, auth, admin, activateCategory);

// Method             PUT
// Access             Private
// URL                http://localhost:4200/api/category/deactive/:catId
route.put("/deactivate/:catId", currentUser, auth, admin, deactivateCategory);

// export route
export { route as categoryRouter };
