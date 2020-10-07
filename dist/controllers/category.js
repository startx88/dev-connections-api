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
exports.deactivateCategory = exports.activateCategory = exports.deleteCategory = exports.addUpdateCategory = exports.getCategories = void 0;
var errors_1 = require("../errors");
var category_1 = require("../models/category");
var post_1 = require("../models/post");
var utility_1 = require("../utility");
/**
 * Get catgories
 */
var getCategories = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cats, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, category_1.Category.find().sort({
                        insertAt: 1,
                    })];
            case 1:
                cats = (_a.sent());
                res.status(200).send({ data: utility_1.transformRespnose(cats, "category") });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                throw next(err_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCategories = getCategories;
/**
 * Get catgories
 */
var addUpdateCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var catId, _a, title, description, image, slug, existCat, cateogry, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                catId = req.params.catId;
                _a = req.body, title = _a.title, description = _a.description, image = _a.image;
                slug = req.body.slug;
                return [4 /*yield*/, category_1.Category.findById(catId)];
            case 1:
                existCat = _b.sent();
                if (!existCat) return [3 /*break*/, 3];
                slug = utility_1.slugname(title);
                existCat.title = title;
                existCat.slug = slug;
                existCat.description = description;
                existCat.image = image;
                return [4 /*yield*/, existCat.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res
                        .status(200)
                        .send({ data: utility_1.transformRespnose(existCat, "category") })];
            case 3:
                if (slug === "")
                    slug = utility_1.slugname(title);
                cateogry = category_1.Category.build({
                    title: title,
                    slug: slug,
                    description: description,
                    image: image,
                });
                return [4 /*yield*/, cateogry.save()];
            case 4:
                _b.sent();
                return [2 /*return*/, res
                        .status(201)
                        .send({ data: utility_1.transformRespnose(cateogry, "category") })];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_2 = _b.sent();
                throw next(err_2);
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addUpdateCategory = addUpdateCategory;
/**
 * Get catgories
 */
var deleteCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var catId, cateogry, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                catId = req.params.catId;
                return [4 /*yield*/, category_1.Category.findById(catId)];
            case 1:
                cateogry = _a.sent();
                if (!cateogry) {
                    throw new errors_1.NotFoundError("Category not found!");
                }
                return [4 /*yield*/, cateogry.remove()];
            case 2:
                result = _a.sent();
                return [4 /*yield*/, post_1.Post.deleteMany({ category: result._id })];
            case 3:
                _a.sent(); // delete all post relative to category
                return [2 /*return*/, res
                        .status(200)
                        .send({ data: utility_1.transformRespnose(cateogry, "category") })];
            case 4:
                err_3 = _a.sent();
                throw next(err_3);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteCategory = deleteCategory;
/**
 * Get catgories
 */
var activateCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var catId, cateogry, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                catId = req.params.catId;
                return [4 /*yield*/, category_1.Category.findById(catId)];
            case 1:
                cateogry = _a.sent();
                if (!cateogry) {
                    throw new errors_1.NotFoundError("Category not found!");
                }
                if (cateogry.active) {
                    throw new errors_1.BadRequestError("Category already activated!");
                }
                cateogry.active = true;
                return [4 /*yield*/, cateogry.save()];
            case 2:
                _a.sent();
                return [4 /*yield*/, post_1.Post.updateMany({ category: catId }, { $set: { active: true } })];
            case 3:
                _a.sent(); // delete all post relative to category
                return [2 /*return*/, res
                        .status(200)
                        .send({ data: utility_1.transformRespnose(cateogry, "category") })];
            case 4:
                err_4 = _a.sent();
                throw next(err_4);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.activateCategory = activateCategory;
/**
 * Get catgories
 */
var deactivateCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var catId, cateogry, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                catId = req.params.catId;
                return [4 /*yield*/, category_1.Category.findById(catId)];
            case 1:
                cateogry = (_a.sent());
                if (!cateogry) {
                    throw new errors_1.NotFoundError("Category not found!");
                }
                if (!cateogry.active) {
                    throw new errors_1.BadRequestError("Category already deactivated!");
                }
                cateogry.active = false;
                return [4 /*yield*/, cateogry.save()];
            case 2:
                _a.sent();
                return [4 /*yield*/, post_1.Post.updateMany({ category: catId }, { $set: { active: false } })];
            case 3:
                _a.sent(); // delete all post relative to category
                return [2 /*return*/, res
                        .status(200)
                        .send({ data: utility_1.transformRespnose(cateogry, "category") })];
            case 4:
                err_5 = _a.sent();
                throw next(err_5);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deactivateCategory = deactivateCategory;
