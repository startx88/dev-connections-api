"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var profile_1 = require("../controllers/profile");
var middleware_1 = require("../middleware");
var utility_1 = require("../utility");
// upload
var upload = utility_1.uploader("profile");
var docUpload = utility_1.uploader("profile", utility_1.docFileFilter);
// route
var route = express_1.default.Router();
exports.profileRouter = route;
/**
 * Fetch all profiles
 * Method             GET
 * Access             Public
 * Url                https://localhost:4200/api/profile
 */
route.get("/", profile_1.getUserProfiles);
/**
 * Fetch logged in user profile
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile/me
 */
route.get("/me", middleware_1.currentUser, middleware_1.auth, profile_1.getProfile);
/**
 * Fetch profile by user id
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile/user/userId
 */
route.get("/user/:userId", middleware_1.currentUser, middleware_1.auth, profile_1.getProfileByUserId);
/**
 * Fetch github profile logged in user
 * METHOD           :  POST
 * URL              :  http://localhost:4200/api/profile/employment/:employmentId
 * ACCESS           :  Private
 */
route.get("/github/:username", middleware_1.currentUser, middleware_1.auth, profile_1.getGitProfile);
/**
 * Add / Update profile
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile
 */
route.post("/:profileId?", middleware_1.currentUser, middleware_1.auth, [
    express_validator_1.body("designation", "designation is required").notEmpty(),
    express_validator_1.body("experience", "experience is required").notEmpty(),
    express_validator_1.body("skills", "skills is required").notEmpty(),
    express_validator_1.body("salary", "salary is required").notEmpty(),
    express_validator_1.body("company", "company is required").notEmpty(),
    express_validator_1.body("location", "location is required").notEmpty(),
], profile_1.addUpdateProfile);
/**
 * Add / Update status
 * Method             GET
 * Access             Private
 * Url                https://localhost:4200/api/profile
 */
route.put("/status", middleware_1.currentUser, middleware_1.auth, profile_1.updateStatus);
/**
 * Add eduction
 * Method             PUT
 * Access             Private
 * Url                https://localhost:4200/api/profile/education
 */
route.put("/education", middleware_1.currentUser, middleware_1.auth, [
    express_validator_1.body("college", "college is required!").notEmpty(),
    express_validator_1.body("course", "course is required!").notEmpty(),
    express_validator_1.body("subject", "subject is required!").notEmpty(),
], profile_1.addEducation);
/**
 * Delete education
 * Method             DELETE
 * Access             Private
 * Url                https://localhost:4200/api/profile/education/educationId
 */
route.delete("/education/:educationId", middleware_1.currentUser, middleware_1.auth, profile_1.deleteEducation);
/**
 * Add employment
 * Method             PUT
 * Access             Private
 * Url                https://localhost:4200/api/profile/employment
 */
route.put("/employment", middleware_1.currentUser, middleware_1.auth, [
    express_validator_1.body("company", "company is required!").notEmpty(),
    express_validator_1.body("designation", "designation is required!").notEmpty(),
    express_validator_1.body("location", "location is required!").notEmpty(),
    express_validator_1.body("salary", "salary is required!").notEmpty(),
    express_validator_1.body("skills", "skills is required!").notEmpty(),
    express_validator_1.body("from", "from is required!").notEmpty(),
], profile_1.addEmployment);
/**
 * Delete employment
 * Method             PUT
 * Access             Private
 * Url                https://localhost:4200/api/profile/employment/employmentId
 */
route.delete("/employment/:employmentId", middleware_1.currentUser, middleware_1.auth, profile_1.deleteEmployment);
/**
 * Upload user avatar
 * Method             PUT
 * Access             Private
 * Url                https://localhost:4200/api/profile/upload
 */
route.put("/upload", middleware_1.currentUser, middleware_1.auth, upload.single("image"), profile_1.uploadImage);
/**
 * Upload user resume
 * Method             PUT
 * Access             Private
 * Url                https://localhost:4200/api/profile/upload
 */
route.put("/resume", middleware_1.currentUser, middleware_1.auth, docUpload.single("file"), profile_1.addResume);
