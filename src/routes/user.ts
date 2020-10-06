import express from "express";
import { activeDeactiveUser, deleteUser, getUsers } from "../controllers/user";
import { User } from "../models/user";
import { admin, auth, currentUser, validateRequest } from "../middleware";

// route
const route = express.Router();

/**
 * METHOD           :  GET
 * URL              :  http://localhost:4200/api/auth/user
 * ACCESS           :  Private
 */

route.get("/", getUsers);

/**
 * METHOD           :  DELETE
 * URL              :  http://localhost:4200/api/auth/user
 * ACCESS           :  Private
 */
route.delete("/:userId", currentUser, auth, admin, deleteUser);

/**
 * METHOD           :  PUT
 * URL              :  http://localhost:4200/api/auth/user
 * ACCESS           :  Private
 */

route.put("/:userId", currentUser, auth, admin, activeDeactiveUser);

// export
export { route as userRouter };
