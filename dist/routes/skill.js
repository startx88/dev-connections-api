"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillRouter = void 0;
var express_1 = __importDefault(require("express"));
var skill_1 = require("../controllers/skill");
var middleware_1 = require("../middleware");
var express_validator_1 = require("express-validator");
// route
var route = express_1.default.Router();
exports.skillRouter = route;
/**
 * Method               GET
 * Access               Public
 * Url                  https://localhost:4200/api/skill
 */
route.get("/", middleware_1.currentUser, middleware_1.auth, skill_1.getSkills);
/**
 * Method               POST
 * Access               Private
 * Url                  https://localhost:4200/api/skill
 */
route.post("/:skillId?", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, [express_validator_1.body("title", "title is requried").notEmpty()], middleware_1.validateRequest, skill_1.addUpdateSkill);
/**
 * Method               DELETE
 * Access               Private
 * Url                  https://localhost:4200/api/skill/:skillId
 */
route.delete("/:skillId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, skill_1.deleteSkill);
/**
 * Method               PUT
 * Access               Private
 * Url                  https://localhost:4200/api/skill/activate/:skillId
 */
route.put("/activate/:skillId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, skill_1.activeSkill);
/**
 * Method               PUT
 * Access               Private
 * Url                  https://localhost:4200/api/skill/deactivate/:skillid
 */
route.put("/deactivate/:skillId", middleware_1.currentUser, middleware_1.auth, middleware_1.admin, skill_1.deactiveSkill);
