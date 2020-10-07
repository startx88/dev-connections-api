import express from "express";
import {
  activatePost,
  addComment,
  addLike,
  addUpdatePost,
  deactivatePost,
  deleteComment,
  deletePost,
  getPost,
  getPostByUser,
  getPosts,
  loggedInUserPosts,
  removeLike,
} from "../controllers/post";
import { auth, currentUser } from "../middleware";
import { body } from "express-validator";
import { uploader } from "../utility";

// upload
const upload = uploader("posts");

// route
const route = express.Router();

/**
 * Get all posts
 * Method               :         GET
 * URL                  :         https://localhost:4200/api/post
 * Access Level         :         Private
 */
route.get("/", currentUser, auth, getPosts);

/**
 * get posts by userid
 * Method               :         GET
 * URL                  :         https://localhost:4200/api/post/:postId
 * Access Level         :         Private
 */
route.get("/user/:postId", currentUser, auth, getPostByUser);

/**
 * get logged in user posts
 * Method               :         GET
 * URL                  :         https://localhost:4200/api/post/me
 * Access Level         :         Private
 */
route.get("/me", currentUser, auth, loggedInUserPosts);

/**
 * get single post
 * Method               :         GET
 * URL                  :         https://localhost:4200/api/post/:postId
 * Access Level         :         Private
 */
route.get("/:postId", currentUser, auth, getPost);

/**
 * add / update post
 * Method               :         POST
 * URL                  :         https://localhost:4200/api/post/:postId
 * Access Level         :         Private
 */
route.post(
  "/:postId?",
  currentUser,
  auth,
  [
    body("title", "title is requried").notEmpty(),
    body("description", "description is requried").notEmpty(),
    body("image", "image is requried").notEmpty(),
  ],
  upload.single("image"),
  addUpdatePost
);

/**
 * delete post
 * Method               :         DELETE
 * URL                  :         https://localhost:4200/api/post/:postId
 * Access Level         :         Private
 */
route.delete("/:postId", currentUser, auth, deletePost);

/**
 * activate post
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/activate/:postId
 * Access Level         :         Private
 */
route.put("/activate/:postId", currentUser, auth, activatePost);

/**
 * deactivate post
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/deactivate/:postId
 * Access Level         :         Private
 */
route.put("/deactivate/:postId", currentUser, auth, deactivatePost);

/**
 *
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/comment/:postId
 * Access Level         :         Private
 */
route.post(
  "/comment/:postId",
  currentUser,
  auth,
  [
    body("title", "title is required").notEmpty(),
    body("message", "message is required").notEmpty(),
  ],
  addComment
);

/**
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/:postId
 * Access Level         :         Private
 */
route.delete("/comment/:postId/:commentId", currentUser, auth, deleteComment);

/**
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/like/:postId
 * Access Level         :         Private
 */
route.put("/like/:postId", currentUser, auth, addLike);

/**
 * Method               :         PUT
 * URL                  :         https://localhost:4200/api/post/dislike:postId
 * Access Level         :         Private
 */
route.put("/dislike/:postId", currentUser, auth, removeLike);

// export
export { route as postRouter };
