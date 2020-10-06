import express from "express";
import {
  getUserProfiles,
  getProfile,
  addUpdateProfile,
  getProfileByUserId,
  updateStatus,
  addEducation,
  deleteEducation,
  addEmployment,
  deleteEmployment,
  uploadImage,
  getGitProfile,
} from "../controllers/profile";
import { auth, currentUser } from "../middleware";
import { uploader } from "../utility";

// upload
const upload = uploader("profile");

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

//@route          GET api/profile/user/userId
//@desc           Get user profile by userid
//@access         Public
route.put("/education", currentUser, auth, addEducation);

//@route          GET api/profile/user/userId
//@desc           Get user profile by userid
//@access         Public
route.delete("/education/:educationId", currentUser, auth, deleteEducation);

/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/api/profile/employment
 * ACCESS           :  PRIVATE
 */
route.put("/employment", currentUser, auth, addEmployment);

/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/api/profile/employment/:employmentId
 * ACCESS           :  Private
 */
route.put("/employment/:employmentId", currentUser, auth, deleteEmployment);

/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/api/profile/employment/:employmentId
 * ACCESS           :  Private
 */
route.put("/upload", currentUser, auth, upload.single("image"), uploadImage);

export { route as profileRouter };
