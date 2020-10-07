"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactiveSkill = exports.activeSkill = exports.deleteSkill = exports.addUpdateSkill = exports.getSkills = void 0;
var errors_1 = require("../errors");
var skills_1 = require("../models/skills");
var utility_1 = require("../utility");
/**
 * Get all skills
 * */
var getSkills = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skills, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, skills_1.Skill.find({ active: true }).sort({ insertAt: 1 })];
            case 1:
                skills = _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Fetch all skills",
                        data: utility_1.transformRespnose(skills),
                    }))];
            case 2:
                err_1 = _a.sent();
                throw next(err_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSkills = getSkills;
/**
 * Get all skills
 * */
var addUpdateSkill = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skillId, existSkill, title, slug, isslug, skill, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                skillId = req.params.skillId;
                return [4 /*yield*/, skills_1.Skill.findById(skillId)];
            case 1:
                existSkill = (_a.sent());
                title = req.body.title;
                slug = req.body.slug;
                if (!existSkill) return [3 /*break*/, 3];
                slug = utility_1.slugname(title);
                existSkill.title = title;
                existSkill.slug = slug;
                existSkill.insertAt = new Date();
                return [4 /*yield*/, existSkill.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Skill updated!",
                        id: skillId,
                        data: utility_1.transformRespnose(existSkill),
                    }))];
            case 3:
                if (slug === "") {
                    slug = utility_1.slugname(title);
                }
                return [4 /*yield*/, skills_1.Skill.findOne({ slug: slug, title: title })];
            case 4:
                isslug = _a.sent();
                if (isslug) {
                    throw new errors_1.BadRequestError("Skill already exited!");
                }
                skill = skills_1.Skill.build({
                    title: title,
                    slug: slug,
                });
                return [4 /*yield*/, skill.save()];
            case 5:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Skill added!",
                        data: utility_1.transformRespnose(skill),
                    }))];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_2 = _a.sent();
                throw next(err_2);
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.addUpdateSkill = addUpdateSkill;
/**
 * Get all skills
 * */
var deleteSkill = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skillId, skill, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                skillId = req.params.skillId;
                return [4 /*yield*/, skills_1.Skill.findById(skillId)];
            case 1:
                skill = _a.sent();
                if (!skill) {
                    throw new errors_1.NotFoundError("Skill not existed");
                }
                return [4 /*yield*/, skill.remove()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Skill deleted successfully",
                        id: skill._id,
                        data: utility_1.transformRespnose(skill),
                    }))];
            case 3:
                err_3 = _a.sent();
                throw next(err_3);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteSkill = deleteSkill;
/**
 * Get all skills
 * */
var activeSkill = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skillId, skill, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                skillId = req.params.skillId;
                return [4 /*yield*/, skills_1.Skill.findById(skillId)];
            case 1:
                skill = _a.sent();
                if (!skill) {
                    throw new errors_1.NotFoundError("Skill not found!");
                }
                if (skill.active) {
                    throw new errors_1.BadRequestError("Skill already activated!");
                }
                skill.active = true;
                return [4 /*yield*/, skill.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Skill active successfully",
                        id: skill._id,
                        data: utility_1.transformRespnose(skill),
                    }))];
            case 3:
                err_4 = _a.sent();
                throw next(err_4);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.activeSkill = activeSkill;
/**
 * Get all skills
 * */
var deactiveSkill = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var skillId, skill, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                skillId = req.params.skillId;
                return [4 /*yield*/, skills_1.Skill.findById(skillId)];
            case 1:
                skill = _a.sent();
                if (!skill) {
                    throw new errors_1.NotFoundError("Skill not found!");
                }
                if (!skill.active) {
                    throw new errors_1.BadRequestError("Skill already deactivated!");
                }
                skill.active = false;
                return [4 /*yield*/, skill.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Skill deactive successfully",
                        id: skill._id,
                        data: utility_1.transformRespnose(skill),
                    }))];
            case 3:
                err_5 = _a.sent();
                throw next(err_5);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deactiveSkill = deactiveSkill;
