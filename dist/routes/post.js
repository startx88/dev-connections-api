"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
var express_1 = __importDefault(require("express"));
var post_1 = require("../controllers/post");
var middleware_1 = require("../middleware");
var express_validator_1 = require("express-validator");
var utility_1 = require("../utility");
// upload
var upload = utility_1.uploader("posts");
// route
var route = express_1.default.Router();
exports.postRouter = route;
/**
 * Get all posts
 * Method               :         GET
 * URL                  :         https://localhost:4200/api/post
 * Access Level         :         Private
 */
route.get("/", middleware_1.currentUser, middleware_1.auth, post_1.getPosts);
/**
 * get posts by userid
 * Method               :         GET
 * URL                  :         https://localhost:4200/api/post/:postId
 * Access Level         :         Private
 */
route.get("/user/:postId", middleware_1.currentUser, middleware_1.auth, post_1.getPostByUser);
/**
 * get logged in user posts
 * Method               :         GET
 * URL                  :         https://localhost:4200/api/post/me
 * Access Level         :         Private
 */
route.get("/me", middleware_1.currentUser, middleware_1.auth, post_1.loggedInUserPosts);
/**
 * get single post
 * Method               :         GET
 * URL                  :         https://localhost:4200/api/post/:postId
 * Access Level         :         Private
 */
route.get("/:postId", middleware_1.currentUser, middleware_1.auth, post_1.getPost);
/**
 * add / update post
 * Method               :         POST
 * URL                  :         https://localhost:4200/api/post/:postId
 * Access Level         :         Private
 */
route.post("/:postId?", middleware_1.currentUser, middleware_1.auth, [
    express_validator_1.body("title", "title is requried").notEmpty(),
    express_validator_1.body("description", "description is requried").notEmpty(),
    express_validator_1.body("image", "image is requried").notEmpty(),
], upload.single("image"), post_1.addUpdatePost);
/**
 * delete post
 * Method               :         DELETE
 * URL                  :         https://localhost:4200/api/post/:postId
 * Access Level         :         Private
 */
route.delete("/:postId", middleware_1.currentUser, middleware_1.auth, post_1.deletePost);
/**
 * activate post
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/activate/:postId
 * Access Level         :         Private
 */
route.put("/activate/:postId", middleware_1.currentUser, middleware_1.auth, post_1.activatePost);
/**
 * deactivate post
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/deactivate/:postId
 * Access Level         :         Private
 */
route.put("/deactivate/:postId", middleware_1.currentUser, middleware_1.auth, post_1.deactivatePost);
/**
 *
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/comment/:postId
 * Access Level         :         Private
 */
route.post("/comment/:postId", middleware_1.currentUser, middleware_1.auth, [
    express_validator_1.body("title", "title is required").notEmpty(),
    express_validator_1.body("message", "message is required").notEmpty(),
], post_1.addComment);
/**
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/:postId
 * Access Level         :         Private
 */
route.delete("/comment/:postId/:commentId", middleware_1.currentUser, middleware_1.auth, post_1.deleteComment);
/**
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/like/:postId
 * Access Level         :         Private
 */
route.put("/like/:postId", middleware_1.currentUser, middleware_1.auth, post_1.addLike);
/**
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/dislike:postId
 * Access Level         :         Private
 */
route.put("/dislike/:postId", middleware_1.currentUser, middleware_1.auth, post_1.removeLike);
