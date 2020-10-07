"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.designationRouter = void 0;
var express_1 = __importDefault(require("express"));
var designation_1 = require("../controllers/designation");
var middleware_1 = require("../middleware");
var express_validator_1 = require("express-validator");
// route
var route = express_1.default.Router();
exports.designationRouter = route;
/**
 * Method               GET
 * Access               Public
 * Url                  https://localhost:4200/api/skill
 */
route.get("/", middleware_1.currentUser, middleware_1.auth, designation_1.getDesignations);
/**
 * Method               POST
 * Access               Private
 * Url                  https://localhost:4200/api/skill
 */
route.post("/:desigId?", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, [express_validator_1.body("title", "title is requried").notEmpty()], middleware_1.validateRequest, designation_1.addUpdateDesignation);
/**
 * Method               DELETE
 * Access               Private
 * Url                  https://localhost:4200/api/skill/:skillId
 */
route.delete("/:desigId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, designation_1.deleteDesignation);
/**
 * Method               PUT
 * Access               Private
 * Url                  https://localhost:4200/api/skill/activate/:skillId
 */
route.put("/activate/:desigId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, designation_1.activeDesignation);
/**
 * Method               PUT
 * Access               Private
 * Url                  https://localhost:4200/api/skill/deactivate/:skillid
 */
route.put("/deactivate/:desigId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, designation_1.deactiveDesignation);
