import express from "express";
import {
  getDesignations,
  addUpdateDesignation,
  deleteDesignation,
  activeDesignation,
  deactiveDesignation,
} from "../controllers/designation";
import { admin, auth, currentUser, validateRequest } from "../middleware";
import { body } from "express-validator";

// route
const route = express.Router();

/**
 * Method               GET
 * Access               Public
 * Url                  https://localhost:4200/api/skill
 */
route.get("/", getDesignations);

/**
 * Method               POST
 * Access               Private
 * Url                  https://localhost:4200/api/skill
 */
route.post(
  "/:desigId?",
  currentUser,
  auth,
  admin,
  [body("title", "title is requried").notEmpty()],
  validateRequest,
  addUpdateDesignation
);

/**
 * Method               DELETE
 * Access               Private
 * Url                  https://localhost:4200/api/skill/:skillId
 */
route.delete("/:desigId", currentUser, auth, admin, deleteDesignation);

/**
 * Method               PUT
 * Access               Private
 * Url                  https://localhost:4200/api/skill/activate/:skillId
 */
route.put("/activate/:desigId", currentUser, auth, admin, activeDesignation);

/**
 * Method               PUT
 * Access               Private
 * Url                  https://localhost:4200/api/skill/deactivate/:skillid
 */
route.put(
  "/deactivate/:desigId",
  currentUser,
  auth,
  admin,
  deactiveDesignation
);

// export
export { route as designationRouter };
