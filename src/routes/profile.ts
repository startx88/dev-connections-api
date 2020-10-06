import express from "express";
import {
  getUserProfiles,
  getProfile,
  addUpdateProfile,
  getProfileByUserId,
  updateStatus,
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
route.post("/", currentUser, auth, addUpdateProfile);

//@route          GET api/profile/user/userId
//@desc           Get user profile by userid
//@access         Public
route.delete("/", currentUser, auth, getProfileByUserId);

/**
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile/me
 */
route.get("/me", currentUser, auth, getProfile);

//@route          GET api/profile/user/userId
//@desc           Get user profile by userid
//@access         Public
route.get("/user/:userId", currentUser, auth, getProfileByUserId);

//@route          GET api/profile/user/userId
//@desc           Get user profile by userid
//@access         Public
route.put("/status", currentUser, auth, updateStatus);

// export
export { route as profileRouter };
