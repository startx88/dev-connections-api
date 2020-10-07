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
exports.removeMultiplePost = exports.postActiveDeactive = exports.rejectPostComment = exports.deletePostComment = exports.deletePostById = void 0;
var post_1 = require("../models/post");
var errors_1 = require("../errors");
var utility_1 = require("../utility");
// remove multiple posts
var removeMultiplePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postIds, posts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                postIds = req.body.postIds;
                return [4 /*yield*/, post_1.Post.find({ _id: { $in: postIds } })];
            case 1:
                posts = _a.sent();
                if (!posts) {
                    throw new errors_1.NotFoundError("Posts not found to belonging ids");
                }
                return [4 /*yield*/, post_1.Post.deleteMany(postIds)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        message: "Posts deleted!",
                        ids: postIds,
                    })];
            case 3:
                err_1 = _a.sent();
                throw next(err_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeMultiplePost = removeMultiplePost;
// delete post by id
var deletePostById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                postId = req.params.postId;
                return [4 /*yield*/, post_1.Post.findById(postId)];
            case 1:
                post = (_a.sent());
                if (!post) {
                    throw new errors_1.NotFoundError("No post related to this " + postId);
                }
                return [4 /*yield*/, post_1.Post.findByIdAndDelete(postId)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        message: "Post Deleted!",
                        id: postId,
                    })];
            case 3:
                err_2 = _a.sent();
                throw next(err_2);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePostById = deletePostById;
// post deactive / active by post id
var postActiveDeactive = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, status_1, post, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                postId = req.params.postId;
                status_1 = req.query.status;
                return [4 /*yield*/, post_1.Post.findById(postId)];
            case 1:
                post = (_a.sent());
                if (!post) {
                    throw new errors_1.NotFoundError("No post related to this " + postId);
                }
                if (!(status_1 === "deactivate")) return [3 /*break*/, 3];
                return [4 /*yield*/, post_1.Post.findByIdAndUpdate(postId, { $set: { active: false } })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        message: "Post deactivated!",
                        id: postId,
                        data: utility_1.transformRespnose(post, "posts"),
                    })];
            case 3:
                post.active = true;
                return [4 /*yield*/, post.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        message: "Post activated!",
                        id: postId,
                        data: utility_1.transformRespnose(post, "posts"),
                    })];
            case 5:
                err_3 = _a.sent();
                throw next(err_3);
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postActiveDeactive = postActiveDeactive;
// delete comment
var deletePostComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, commentId_1, post, comments, err_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                postId = req.params.postId;
                commentId_1 = req.params.commentId;
                return [4 /*yield*/, post_1.Post.findById(postId)];
            case 1:
                post = (_b.sent());
                if (!post) {
                    throw new errors_1.NotFoundError("No post related to this " + postId);
                }
                comments = (_a = post.comments) === null || _a === void 0 ? void 0 : _a.filter(function (comment) { var _a; return ((_a = comment._id) === null || _a === void 0 ? void 0 : _a.toString()) !== commentId_1; });
                post.comments = comments;
                return [4 /*yield*/, post.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).send({
                        message: "Post Deleted!",
                        id: postId,
                    })];
            case 3:
                err_4 = _b.sent();
                throw next(err_4);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePostComment = deletePostComment;
var rejectPostComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, commentId_2, post, existingComments, index, comment, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                postId = req.params.postId;
                commentId_2 = req.params.commentId;
                return [4 /*yield*/, post_1.Post.findById(postId)];
            case 1:
                post = (_a.sent());
                // ! post then throw error
                if (!post) {
                    throw new errors_1.NotFoundError("No post related to this " + postId);
                }
                existingComments = post.comments;
                index = existingComments.findIndex(function (comment) { return comment._id === commentId_2; });
                comment = existingComments[index];
                comment.status = "rejected";
                existingComments[index] = comment;
                post.comments = existingComments;
                // save post
                return [4 /*yield*/, post.save()];
            case 2:
                // save post
                _a.sent();
                return [2 /*return*/, res.status(200).send({
                        message: "Post Deleted!",
                        id: postId,
                    })];
            case 3:
                err_5 = _a.sent();
                throw next(err_5);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.rejectPostComment = rejectPostComment;
