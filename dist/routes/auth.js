"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var auth_1 = require("../controllers/auth");
var middleware_1 = require("../middleware");
var schema_1 = require("./schema");
// route
var route = express_1.default.Router();
exports.authRouter = route;
/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/api/auth/signup
 * ACCESS           :  PUBLIC
 */
route.post("/signup", schema_1.signupSchema, middleware_1.validateRequest, auth_1.userSignup);
/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/auth/signup
 * ACCESS           :  PUBLIC
 */
route.post("/", schema_1.signinSchema, middleware_1.validateRequest, auth_1.userSignin);
/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/auth/signup
 * ACCESS           :  PUBLIC
 */
route.get("/verify-email/:token", schema_1.signinSchema, auth_1.activateAccount);
/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/auth/resend-verification-email
 * ACCESS           :  PUBLIC
 */
route.post("/resend-verification-email", middleware_1.currentUser, middleware_1.auth, schema_1.signinSchema, auth_1.resendEmail);
/**
 * METHOD           :  POST
 * URL              :  http://localhost:4200/auth/signup
 * ACCESS           :  PUBLIC
 */
route.post("/forgot-password", schema_1.forgotSchema, middleware_1.validateRequest, auth_1.forgotPassword);
/**
 * Reset password route
 * METHOD           :  GET
 * URL              :  http://localhost:4200/auth/reset
 * ACCESS           :  PUBLIC
 */
route.get("/reset/:token", auth_1.getReset);
route.post("/new-password", schema_1.newPasswordSchema, middleware_1.validateRequest, auth_1.postReset);
