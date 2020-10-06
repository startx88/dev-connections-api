import express from "express";
import {
  getUserProfiles,
  getProfile,
  addUpdateProfile,
} from "../controllers/profile";
import { auth, currentUser } from "../middleware";
// route
const route = express.Router();

/**
 * Method             GET
 * Access             Public
 * Url                https://localhost:4200/api/profile
 */
route.get("/", getUserProfiles);

/**
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile/me
 */
route.post("/", currentUser, addUpdateProfile);

/**
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile/me
 */
route.get("/me", currentUser, getProfile);

// export
export { route as profileRouter };
