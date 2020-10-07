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
exports.activeDeactiveUser = exports.deleteUser = exports.getUsers = void 0;
var errors_1 = require("../errors");
var profile_1 = require("../models/profile");
var user_1 = require("../models/user");
var utility_1 = require("../utility");
/**
 * get all users
 *
 * */
var getUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, updated, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.User.find({ active: true })];
            case 1:
                users = _a.sent();
                updated = users.filter(function (user) { return user.role !== "admin"; });
                return [2 /*return*/, res.status(200).json({
                        message: "Users fetched",
                        data: utility_1.transformRespnose(updated),
                    })];
            case 2:
                err_1 = _a.sent();
                throw next(err_1);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
/**
 * delete user
 *
 * */
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.params.userId;
                return [4 /*yield*/, user_1.User.findByIdAndDelete(userId)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, profile_1.Profile.findByIdAndDelete({ user: userId })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "User deleted successfully!",
                        id: userId,
                        data: utility_1.transformRespnose(user),
                    }))];
            case 3:
                err_2 = _a.sent();
                throw next(err_2);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
/**
 * Active / Deactive user
 *
 *  */
var activeDeactiveUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status_1, userId, user, profile, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                status_1 = req.query.status;
                userId = req.params.userId;
                return [4 /*yield*/, user_1.User.findById(userId)];
            case 1:
                user = (_a.sent());
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 2:
                profile = (_a.sent());
                if (!user) {
                    throw new errors_1.NotFoundError("User not found!");
                }
                if (!user.active) {
                    throw new errors_1.BadRequestError("User already deactivated!");
                }
                if (!(status_1 === "deactivate")) return [3 /*break*/, 5];
                user.active = false;
                profile.active = false;
                return [4 /*yield*/, profile.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "User deactivated successfully",
                        id: userId,
                        data: utility_1.transformRespnose(user),
                    }))];
            case 5:
                if (user.active) {
                    return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                            message: "User already activated!",
                            id: userId,
                            data: utility_1.transformRespnose(user),
                        }))];
                }
                user.active = true;
                profile.active = false;
                return [4 /*yield*/, profile.save()];
            case 6:
                _a.sent();
                return [4 /*yield*/, user.save()];
            case 7:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "User activated successfully",
                        id: userId,
                        data: utility_1.transformRespnose(user),
                    }))];
            case 8:
                err_3 = _a.sent();
                throw next(err_3);
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.activeDeactiveUser = activeDeactiveUser;
