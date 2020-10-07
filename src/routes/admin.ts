import express from "express";
import {
  deletePostById,
  deletePostComment,
  postActiveDeactive,
  rejectPostComment,
  removeMultiplePost,
} from "../controllers/admin";

import { admin, auth, currentUser } from "../middleware";

// route
const route = express.Router();

/**
 * Method                   DELETE
 * Access                   Private only admin
 * url                      https:localhost:4200/api/admin/post
 */

route.delete("/post", currentUser, auth, admin, removeMultiplePost);

/**
 * Method                   DELETE
 * Access                   Private only admin
 * url                      https:localhost:4200/api/admin/post/:postId
 */

route.delete("/post/:postId", currentUser, auth, admin, deletePostById);

/**
 * Method                   PUT
 * Access                   Private only admin
 * url                      https:localhost:4200/api/admin/post/:postId
 */

route.put("/post/:postId", currentUser, auth, admin, postActiveDeactive);

/**
 * Method                   DELETE
 * Access                   Private only admin
 * url                      https:localhost:4200/api/admin/post/comment/:postId/:commentId
 */

route.delete(
  "/post/comment/:postId/:commentId",
  currentUser,
  auth,
  admin,
  deletePostComment
);

/**
 * Method                   PUT
 * Access                   Private only admin
 * url                      https:localhost:4200/api/admin/post/comment/:postId/:commentId
 */

route.put(
  "/post/comment/:postId/:commentId",
  currentUser,
  auth,
  admin,
  rejectPostComment
);

// export route
export { route as adminRouter };
