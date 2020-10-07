"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
var express_1 = __importDefault(require("express"));
var admin_1 = require("../controllers/admin");
var middleware_1 = require("../middleware");
// route
var route = express_1.default.Router();
exports.adminRouter = route;
/**
 * Method                   DELETE
 * Access                   Private only admin
 * url                      https:localhost:4200/api/admin/post
 */
route.delete("/post", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, admin_1.removeMultiplePost);
/**
 * Method                   DELETE
 * Access                   Private only admin
 * url                      https:localhost:4200/api/admin/post/:postId
 */
route.delete("/post/:postId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, admin_1.deletePostById);
/**
 * Method                   PUT
 * Access                   Private only admin
 * url                      https:localhost:4200/api/admin/post/:postId
 */
route.put("/post/:postId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, admin_1.postActiveDeactive);
/**
 * Method                   DELETE
 * Access                   Private only admin
 * url                      https:localhost:4200/api/admin/post/comment/:postId/:commentId
 */
route.delete("/post/comment/:postId/:commentId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, admin_1.deletePostComment);
/**
 * Method                   PUT
 * Access                   Private only admin
 * url                      https:localhost:4200/api/admin/post/comment/:postId/:commentId
 */
route.put("/post/comment/:postId/:commentId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, admin_1.rejectPostComment);
