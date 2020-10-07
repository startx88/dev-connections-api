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
exports.loggedInUserPosts = exports.removeLike = exports.addLike = exports.deleteComment = exports.addComment = exports.deactivatePost = exports.activatePost = exports.deletePost = exports.addUpdatePost = exports.getPostByUser = exports.getPost = exports.getPosts = void 0;
var errors_1 = require("../errors");
var post_1 = require("../models/post");
var user_1 = require("../models/user");
var utility_1 = require("../utility");
/**
 * get all posts
 */
var getPosts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, post_1.Post.find({ active: true }).populate("user category", "-password -token -expireToken")];
            case 1:
                posts = (_a.sent());
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Post fetched!",
                        data: utility_1.transformRespnose(posts, "posts"),
                    }))];
            case 2:
                err_1 = _a.sent();
                throw next(err_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPosts = getPosts;
/**
 * get all posts by user id
 */
var getPostByUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, posts, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, post_1.Post.find({ user: userId, active: true }).populate("user category", "-password -token -expireToken")];
            case 1:
                posts = (_a.sent());
                if (!posts) {
                    throw new errors_1.NotFoundError("There is not post for this user!");
                }
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: userId + " post fetched",
                        id: userId,
                        data: utility_1.transformRespnose(posts, "posts"),
                    }))];
            case 2:
                err_2 = _a.sent();
                throw next(err_2);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPostByUser = getPostByUser;
/**
 * get logged in user post
 */
var getPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                postId = req.params.postId;
                return [4 /*yield*/, post_1.Post.findById(postId).populate("user", "-password -token -expireToken")];
            case 1:
                post = (_a.sent());
                if (!post) {
                    throw new errors_1.NotFoundError("There is no post belong this postId" + postId);
                }
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Single post fetched",
                        id: postId,
                        data: utility_1.transformRespnose(post, "posts"),
                    }))];
            case 2:
                err_3 = _a.sent();
                throw next(err_3);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPost = getPost;
/**
 * get logged in user posts
 * @param req
 * @param res
 * @param next
 */
var loggedInUserPosts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, posts, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.currentUser.id;
                return [4 /*yield*/, post_1.Post.find({ user: userId, active: true })];
            case 1:
                posts = _a.sent();
                if (!posts) {
                    throw new errors_1.NotFoundError("You have not posts!");
                }
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Post fetched",
                        id: userId,
                        data: utility_1.transformRespnose(posts, "posts"),
                    }))];
            case 2:
                err_4 = _a.sent();
                throw next(err_4);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loggedInUserPosts = loggedInUserPosts;
/**
 * add update post
 */
var addUpdatePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, userId, user, _a, title, description, category, image, postExist, post, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                postId = req.params.postId;
                userId = req.currentUser.id;
                return [4 /*yield*/, user_1.User.findById(userId)];
            case 1:
                user = (_b.sent());
                if (!user) {
                    throw new errors_1.NotFoundError("You have no permission to add / update post.");
                }
                _a = req.body, title = _a.title, description = _a.description, category = _a.category;
                image = req.file;
                return [4 /*yield*/, post_1.Post.findById(postId)];
            case 2:
                postExist = (_b.sent());
                if (!postExist) return [3 /*break*/, 4];
                postExist.category = category;
                postExist.title = title;
                postExist.description = description;
                if (image) {
                    utility_1.deleteFile(postExist.image);
                    postExist.image = image.path;
                }
                return [4 /*yield*/, postExist.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Post updated successfully!",
                        id: postId,
                        data: utility_1.transformRespnose(postExist, "posts"),
                    }))];
            case 4:
                post = post_1.Post.build({
                    category: category,
                    user: userId,
                    title: title,
                    description: description,
                    image: image.path,
                });
                return [4 /*yield*/, post.save()];
            case 5:
                _b.sent();
                return [2 /*return*/, res.status(201).send(utility_1.responseBody({
                        message: "Post added successfully!",
                        data: utility_1.transformRespnose(post, "posts"),
                    }))];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_5 = _b.sent();
                throw next(err_5);
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.addUpdatePost = addUpdatePost;
/**
 * get all posts
 */
var deletePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, post, result, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                postId = req.params.postId;
                return [4 /*yield*/, post_1.Post.findById(postId)];
            case 1:
                post = (_a.sent());
                if (!post) {
                    throw new errors_1.NotFoundError("There is no post found");
                }
                return [4 /*yield*/, post_1.Post.findByIdAndDelete(postId)];
            case 2:
                result = _a.sent();
                if (result) {
                    utility_1.deleteFile(post.image);
                }
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Post deleted successfully",
                        data: utility_1.transformRespnose(post, "posts"),
                    }))];
            case 3:
                err_6 = _a.sent();
                throw next(err_6);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
/**
 * get all posts
 */
var activatePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, userId, post, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                postId = req.params.postId;
                userId = req.currentUser.id;
                return [4 /*yield*/, post_1.Post.findOne({ _id: postId, user: userId })];
            case 1:
                post = (_a.sent());
                if (!post) {
                    throw new errors_1.BadRequestError("This post not belong to you!");
                }
                if (post.active) {
                    throw new errors_1.BadRequestError("Post already activated!");
                }
                post.active = true;
                return [4 /*yield*/, post.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Post activated!",
                        data: utility_1.transformRespnose(post, "posts"),
                    }))];
            case 3:
                err_7 = _a.sent();
                throw next(err_7);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.activatePost = activatePost;
/**
 * get all posts
 */
var deactivatePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, userId, post, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                postId = req.params.postId;
                userId = req.currentUser.id;
                return [4 /*yield*/, post_1.Post.findOne({ _id: postId, user: userId })];
            case 1:
                post = (_a.sent());
                if (!post) {
                    throw new errors_1.BadRequestError("This post not belong to you!");
                }
                if (!post.active) {
                    throw new errors_1.BadRequestError("Post already deactivated!");
                }
                post.active = false;
                return [4 /*yield*/, post.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Post deactivated!",
                        data: utility_1.transformRespnose(post, "posts"),
                    }))];
            case 3:
                err_8 = _a.sent();
                throw next(err_8);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deactivatePost = deactivatePost;
/**
 * add comment
 */
var addComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, userId, post, _a, name_1, message, status_1, err_9;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                postId = req.params.postId;
                userId = req.currentUser.id;
                return [4 /*yield*/, post_1.Post.findById(postId)];
            case 1:
                post = (_c.sent());
                if (!post) {
                    throw new errors_1.NotFoundError("Post not found!");
                }
                _a = req.body, name_1 = _a.name, message = _a.message;
                status_1 = message.includes("sex") ? "rejected" : "approved";
                (_b = post.comments) === null || _b === void 0 ? void 0 : _b.push({
                    user: userId,
                    name: name_1,
                    message: message,
                    status: status_1,
                });
                return [4 /*yield*/, post.save()];
            case 2:
                _c.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Comment added!",
                        id: postId,
                        data: utility_1.transformRespnose(post, "posts"),
                    }))];
            case 3:
                err_9 = _c.sent();
                throw next(err_9);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addComment = addComment;
/**
 * delete comment
 */
var deleteComment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId_1, postId, commentId_1, post, comment, comments, err_10;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                userId_1 = req.currentUser.id;
                postId = req.params.postId;
                commentId_1 = req.params.commentId;
                return [4 /*yield*/, post_1.Post.findById(postId)];
            case 1:
                post = (_c.sent());
                if (!post) {
                    throw new errors_1.NotFoundError("Post not found!");
                }
                return [4 /*yield*/, ((_a = post.comments) === null || _a === void 0 ? void 0 : _a.find(function (comment) {
                        return comment.user.toString() === userId_1 &&
                            comment._id.toString() === commentId_1;
                    }))];
            case 2:
                comment = _c.sent();
                if (!comment) {
                    throw new errors_1.BadRequestError("You can not delete another user comment!");
                }
                comments = (_b = post.comments) === null || _b === void 0 ? void 0 : _b.filter(function (com) { var _a; return ((_a = com._id) === null || _a === void 0 ? void 0 : _a.toString()) !== commentId_1; });
                post.comments = comments;
                return [4 /*yield*/, post.save()];
            case 3:
                _c.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Comment deleted!",
                        data: utility_1.transformRespnose(post, "posts"),
                    }))];
            case 4:
                err_10 = _c.sent();
                throw next(err_10);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteComment = deleteComment;
/**
 * add comment
 */
var addLike = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId_2, postId, post, Likes, like, err_11;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                userId_2 = req.currentUser.id;
                postId = req.params.postId;
                return [4 /*yield*/, post_1.Post.findById(postId)];
            case 1:
                post = (_d.sent());
                Likes = (_a = post.likes) === null || _a === void 0 ? void 0 : _a.filter(function (like) { return like.user.toString() === userId_2; });
                if (Likes.length > 0) {
                    like = ((_b = post.likes) === null || _b === void 0 ? void 0 : _b.find(function (like) { return like.user.toString() === userId_2; }));
                    if (like.active) {
                        throw new errors_1.BadRequestError("You have already liked this post!");
                    }
                    updateLikes(post, userId_2, true);
                }
                else {
                    (_c = post.likes) === null || _c === void 0 ? void 0 : _c.unshift({ user: userId_2, active: true });
                }
                // save post after updating
                return [4 /*yield*/, post.save()];
            case 2:
                // save post after updating
                _d.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "You like the post!",
                        data: utility_1.transformRespnose(post, "posts"),
                    }))];
            case 3:
                err_11 = _d.sent();
                throw next(err_11);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addLike = addLike;
/**
 * Remove like from post
 */
var removeLike = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId_3, postId, post, postLikes, dislike, err_12;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                userId_3 = req.currentUser.id;
                postId = req.params.postId;
                return [4 /*yield*/, post_1.Post.findById(postId)];
            case 1:
                post = (_d.sent());
                if (!post) {
                    throw new errors_1.NotFoundError("Post not found!");
                }
                postLikes = (_a = post.likes) === null || _a === void 0 ? void 0 : _a.filter(function (like) { return like.user.toString() === userId_3; });
                if (postLikes.length > 0) {
                    dislike = (_b = post.likes) === null || _b === void 0 ? void 0 : _b.find(function (like) { return like.user.toString() === userId_3; });
                    if (!dislike.active) {
                        throw new errors_1.BadRequestError("You have already dislike this post!");
                    }
                    updateLikes(post, userId_3, false);
                }
                else {
                    (_c = post.likes) === null || _c === void 0 ? void 0 : _c.unshift({ user: userId_3, active: false });
                }
                return [4 /*yield*/, post.save()];
            case 2:
                _d.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "You dislike the post!",
                        data: utility_1.transformRespnose(post, "posts"),
                    }))];
            case 3:
                err_12 = _d.sent();
                throw next(err_12);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.removeLike = removeLike;
// update like
function updateLikes(post, userId, value) {
    var existLikes = post.likes;
    var index = existLikes.findIndex(function (like) { return like.user.toString() === userId; });
    var existLike = existLikes[index];
    existLike.active = value;
    existLikes[index] = existLike;
    post.likes = existLikes;
}
