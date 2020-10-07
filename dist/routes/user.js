"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_1 = require("../controllers/user");
var middleware_1 = require("../middleware");
// route
var route = express_1.default.Router();
exports.userRouter = route;
/**
 * METHOD           :  GET
 * URL              :  http://localhost:4200/api/auth/user
 * ACCESS           :  Private
 */
route.get("/", middleware_1.currentUser, middleware_1.auth, user_1.getUsers);
/**
 * METHOD           :  DELETE
 * URL              :  http://localhost:4200/api/auth/user
 * ACCESS           :  Private
 */
route.delete("/:userId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, user_1.deleteUser);
/**
 * METHOD           :  PUT
 * URL              :  http://localhost:4200/api/auth/user
 * ACCESS           :  Private
 */
route.put("/:userId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, user_1.activeDeactiveUser);
