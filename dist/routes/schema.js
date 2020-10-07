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
exports.newPasswordSchema = exports.resetPasswordSchema = exports.forgotSchema = exports.signinSchema = exports.signupSchema = void 0;
var express_validator_1 = require("express-validator");
var utility_1 = require("../utility");
var user_1 = require("../models/user");
var errors_1 = require("../errors");
// signup schema
exports.signupSchema = [
    express_validator_1.body("firstname", "firstname is required!").notEmpty(),
    express_validator_1.body("lastname", "lastname is required!").notEmpty(),
    express_validator_1.body("email", "email is required")
        .isEmail()
        .custom(function (email) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.User.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        throw new errors_1.BadRequestError("User already existed");
                    }
                    return [2 /*return*/, user];
            }
        });
    }); }),
    express_validator_1.body("password", "password is required!")
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must be 8 to 16 char long")
        .matches(utility_1.regExp.password)
        .withMessage("Password must be one uppercase, one lowercase, one digit and one symbol."),
    express_validator_1.body("mobile", "mobile is required!")
        .isLength({ min: 10, max: 10 })
        .withMessage("Password must be 10 char")
        .matches(utility_1.regExp.mobile)
        .custom(function (mobile) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.User.findOne({ mobile: mobile })];
                case 1:
                    user = _a.sent();
                    if (user) {
                        throw new errors_1.BadRequestError("Mobile already existed");
                    }
                    return [2 /*return*/, user];
            }
        });
    }); }),
];
// signin schema
exports.signinSchema = [
    express_validator_1.oneOf([
        express_validator_1.body("email").isEmail().withMessage("Please use valid email address"),
        express_validator_1.body("email").isMobilePhone("en-IN"),
    ]),
    express_validator_1.body("password", "password is required!")
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must be 8 to 16 char long")
        .matches(utility_1.regExp.password)
        .withMessage("Password must be one uppercase, one lowercase, one digit and one symbol."),
];
exports.forgotSchema = [
    express_validator_1.oneOf([
        express_validator_1.body("email").isEmail().withMessage("Please use valid email address"),
        express_validator_1.body("email").isMobilePhone("en-IN"),
    ]),
];
exports.resetPasswordSchema = [
    express_validator_1.body("password", "password is required!")
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must be 8 to 16 char long")
        .matches(utility_1.regExp.password)
        .withMessage("Password must be one uppercase, one lowercase, one digit and one symbol."),
];
exports.newPasswordSchema = [
    express_validator_1.body("password", "password is required!")
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must be 8 to 16 char long")
        .matches(utility_1.regExp.password)
        .withMessage("Password must be one uppercase, one lowercase, one digit and one symbol."),
    express_validator_1.body("confirm-password", "confirm-password is required")
        .isLength({ min: 8, max: 16 })
        .withMessage("Password must be 8 to 16 char long")
        .matches(utility_1.regExp.password)
        .custom(function (value, _a) {
        var req = _a.req;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (value !== req.body.password) {
                    return [2 /*return*/, Promise.reject("Confirm password not match with password")];
                }
                return [2 /*return*/, true];
            });
        });
    }),
];
