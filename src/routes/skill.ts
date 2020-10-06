import express from "express";
import {
  getSkills,
  addUpdateSkill,
  deleteSkill,
  activeSkill,
  deactiveSkill,
} from "../controllers/skill";
import { admin, auth, currentUser, validateRequest } from "../middleware";
import { body } from "express-validator";

// route
const route = express.Router();

/**
 * Method               GET
 * Access               Public
 * Url                  https://localhost:4200/api/skill
 */
route.get("/", getSkills);

/**
 * Method               POST
 * Access               Private
 * Url                  https://localhost:4200/api/skill
 */
route.post(
  "/:skillId?",
  currentUser,
  auth,
  admin,
  [body("title", "title is requried").notEmpty()],
  validateRequest,
  addUpdateSkill
);

/**
 * Method               DELETE
 * Access               Private
 * Url                  https://localhost:4200/api/skill/:skillId
 */
route.delete("/:skillId", deleteSkill);

/**
 * Method               PUT
 * Access               Private
 * Url                  https://localhost:4200/api/skill/activate/:skillId
 */
route.put("/activate/:skillId", activeSkill);

/**
 * Method               PUT
 * Access               Private
 * Url                  https://localhost:4200/api/skill/deactivate/:skillid
 */
route.put("/deactivate/:skillId", deactiveSkill);

// export
export { route as skillRouter };
