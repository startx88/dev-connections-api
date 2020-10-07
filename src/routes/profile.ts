import express from "express";
import { body } from "express-validator";
import { FileFilterCallback } from "multer";
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
  addResume,
} from "../controllers/profile";
import { BadRequestError } from "../errors";
import { auth, currentUser } from "../middleware";
import { uploader, docFileFilter } from "../utility";

// upload
const upload = uploader("profile");
const docUpload = uploader("profile", docFileFilter);

// route
const route = express.Router();

/**
 * Fetch all profiles
 * Method             GET
 * Access             Public
 * Url                https://localhost:4200/api/profile
 */
route.get("/", getUserProfiles);

/**
 * Fetch logged in user profile
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile/me
 */
route.get("/me", currentUser, auth, getProfile);

/**
 * Fetch profile by user id
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile/user/userId
 */
route.get("/user/:userId", currentUser, auth, getProfileByUserId);

/**
 * Fetch github profile logged in user
 * METHOD           :  POST
 * URL              :  http://localhost:4200/api/profile/employment/:employmentId
 * ACCESS           :  Private
 */
route.get("/github/:username", currentUser, auth, getGitProfile);

/**
 * Add / Update profile
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile
 */
route.post(
  "/:profileId?",
  currentUser,
  auth,
  [
    body("designation", "designation is required").notEmpty(),
    body("experience", "experience is required").notEmpty(),
    body("skills", "skills is required").notEmpty(),
    body("salary", "salary is required").notEmpty(),
    body("company", "company is required").notEmpty(),
    body("location", "location is required").notEmpty(),
  ],
  addUpdateProfile
);

/**
 * Add / Update status
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile
 */
route.put("/status", currentUser, auth, updateStatus);

/**
 * Add eduction
 * Method             PUT
 * Access             Private
 * Url                https://localhost:4200/api/profile/education
 */
route.put(
  "/education",
  currentUser,
  auth,
  [
    body("college", "college is required!").notEmpty(),
    body("course", "course is required!").notEmpty(),
    body("subject", "subject is required!").notEmpty(),
  ],
  addEducation
);

/**
 * Delete education
 * Method             DELETE
 * Access             Private
 * Url                https://localhost:4200/api/profile/education/educationId
 */
route.delete("/education/:educationId", currentUser, auth, deleteEducation);

/**
 * Add employment
 * Method             PUT
 * Access             Private
 * Url                https://localhost:4200/api/profile/employment
 */
route.put(
  "/employment",
  currentUser,
  auth,
  [
    body("company", "company is required!").notEmpty(),
    body("designation", "designation is required!").notEmpty(),
    body("location", "location is required!").notEmpty(),
    body("salary", "salary is required!").notEmpty(),
    body("skills", "skills is required!").notEmpty(),
    body("from", "from is required!").notEmpty(),
  ],
  addEmployment
);

/**
 * Delete employment
 * Method             PUT
 * Access             Private
 * Url                https://localhost:4200/api/profile/employment/employmentId
 */
route.delete("/employment/:employmentId", currentUser, auth, deleteEmployment);

/**
 * Upload user avatar
 * Method             PUT
 * Access             Private
 * Url                https://localhost:4200/api/profile/upload
 */
route.put("/upload", currentUser, auth, upload.single("image"), uploadImage);

/**
 * Upload user resume
 * Method             PUT
 * Access             Private
 * Url                https://localhost:4200/api/profile/upload
 */
route.put("/resume", currentUser, auth, docUpload.single("file"), addResume);

// exports
export { route as profileRouter };
