"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
var express_1 = __importDefault(require("express"));
var category_1 = require("../controllers/category");
var express_validator_1 = require("express-validator");
var middleware_1 = require("../middleware");
// route
var route = express_1.default.Router();
exports.categoryRouter = route;
/**
 * Method               GET
 * Access Level         Private
 * Url                  https://localhost:4200/api/category
 */
route.get("/", middleware_1.currentUser, middleware_1.auth, category_1.getCategories);
/**
 * Method               POST
 * Access Level         Private
 * Url                  https://localhost:4200/api/category
 */
route.post("/:catId?", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, [express_validator_1.body("title", "category name is required!").notEmpty()], middleware_1.validateRequest, category_1.addUpdateCategory);
/**
 * Method               Delete
 * Access Level         Private
 * Url                  https://localhost:4200/api/category
 */
route.delete("/:catId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, category_1.deleteCategory);
/**
 * Method               PUT
 * Access Level         Private
 * Url                  https://localhost:4200/api/category/activate
 */
route.put("/activate/:catId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, category_1.activateCategory);
// Method             PUT
// Access             Private
// URL                http://localhost:4200/api/category/deactive/:catId
route.put("/deactivate/:catId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, category_1.deactivateCategory);
