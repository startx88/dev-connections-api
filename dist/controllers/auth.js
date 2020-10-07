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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.forgotPassword = exports.postReset = exports.getReset = exports.resendEmail = exports.activateAccount = exports.userSignin = exports.userSignup = void 0;
var path_1 = __importDefault(require("path"));
var errors_1 = require("../errors");
var user_1 = require("../models/user");
var utility_1 = require("../utility");
/**
 * User registration
 * @param req
 * @param res
 * @param next
 */
var userSignup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, email, password, mobile, role, user, jwt, token, expireTime, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, email = _a.email, password = _a.password, mobile = _a.mobile, role = _a.role;
                user = user_1.User.build({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    mobile: mobile,
                    role: role,
                });
                jwt = new utility_1.JWT(user);
                token = jwt.generateToken();
                expireTime = utility_1.tokenExpireDate(1);
                user.token = token;
                user.expireToken = expireTime;
                // mailer
                utility_1.Mailer.emailContainer({
                    local: res.locals.localURL,
                    email: email,
                    token: token,
                    templateName: "registration",
                    user: user,
                });
                // save
                return [4 /*yield*/, user.save()];
            case 1:
                // save
                _b.sent();
                res.status(201).send(utility_1.responseBody({
                    message: "User registerd successfully.",
                    token: token,
                    data: user,
                }));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.userSignup = userSignup;
var userSignin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, verify, jwt, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1.User.findOne({
                        $or: [{ email: email }, { mobile: email }],
                    })];
            case 1:
                user = _b.sent();
                // throw error if user not found
                if (!user) {
                    throw next(new errors_1.NotFoundError("User not registerd with this \"" + email + "\"."));
                }
                return [4 /*yield*/, utility_1.Password.toCompare(password, user.password)];
            case 2:
                verify = _b.sent();
                if (!verify) {
                    throw new errors_1.AuthenticationError("Password not match, please use valid password");
                }
                jwt = new utility_1.JWT(user);
                token = jwt.generateToken();
                // send response
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "User loggedin!",
                        token: token,
                        data: user,
                    }))];
            case 3:
                err_2 = _b.sent();
                throw next(err_2);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userSignin = userSignin;
/**
 * User verify via email
 * @param req
 * @param res
 * @param next
 */
var activateAccount = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, jwt, tokenInfo, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = req.params.token;
                jwt = new utility_1.JWT();
                tokenInfo = jwt.verifyJwtToken(token);
                return [4 /*yield*/, user_1.User.findOneAndUpdate({ email: tokenInfo.email, expireToken: { $gt: new Date(Date.now()) } }, { $set: { verify: true } })];
            case 1:
                user = (_a.sent());
                if (user) {
                    new errors_1.BadRequestError("token expires, Please resend email");
                }
                res.render(path_1.default.join(__dirname, "..", "views/confirm.ejs"), {
                    fullname: user.firstname + " " + user.lastname,
                    url: res.locals.localURL,
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                throw next(err_3);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.activateAccount = activateAccount;
/**
 * Resend Email if token expire
 * @param req
 * @param res
 * @param next
 */
var resendEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, jwt, token, expireTime, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = "req.currentUser?.id";
                return [4 /*yield*/, user_1.User.findById(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new errors_1.AuthenticationError("User not existed!");
                }
                jwt = new utility_1.JWT(user);
                token = jwt.generateToken();
                expireTime = utility_1.tokenExpireDate();
                user.token = token;
                user.expireToken = expireTime;
                // send email
                utility_1.Mailer.emailContainer({
                    local: res.locals.localURL,
                    email: user.email,
                    token: token,
                    templateName: "registration",
                    user: user,
                });
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res
                        .status(200)
                        .send({ message: "Email sent!, please check your email" })];
            case 3:
                err_4 = _a.sent();
                throw next(err_4);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.resendEmail = resendEmail;
/**
 * Forgot password
 * @param req
 * @param res
 * @param next
 */
var forgotPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, jwt, token, expireTime, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                email = req.body.email;
                return [4 /*yield*/, user_1.User.findOne({
                        $or: [{ email: email }, { mobile: email }],
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new errors_1.NotFoundError(email + " not found!");
                }
                jwt = new utility_1.JWT(user);
                token = jwt.generateToken();
                expireTime = utility_1.tokenExpireDate();
                user.token = token;
                user.expireToken = expireTime;
                // genere mail
                utility_1.Mailer.emailContainer({
                    local: res.locals.localURL,
                    email: email,
                    token: token,
                    templateName: "forgot-password",
                    user: user,
                });
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res
                        .status(200)
                        .send({ message: "Email sent!, Please check your email" })];
            case 3:
                err_5 = _a.sent();
                throw next(err_5);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = forgotPassword;
/**
 * reset user password
 * @param req
 * @param res
 * @param next
 */
var getReset = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    return __generator(this, function (_a) {
        try {
            token = req.params.token;
            // render the template for change password
            res.render("new-password", {
                title: "Change password",
                year: new Date().getFullYear(),
                token: token,
            });
        }
        catch (err) {
            throw next(err);
        }
        return [2 /*return*/];
    });
}); };
exports.getReset = getReset;
var postReset = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, password, user, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, token = _a.token, password = _a.password;
                return [4 /*yield*/, user_1.User.findOne({
                        token: token,
                        expireToken: { $gt: new Date(Date.now()) },
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    throw new errors_1.AuthenticationError("Token expired!");
                }
                user.password = password;
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).json({
                        message: "Password changed successfully!",
                    })];
            case 3:
                err_6 = _b.sent();
                throw next(err_6);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.postReset = postReset;
/**
 * change user password
 * @param req
 * @param res
 * @param next
 */
var changePassword = function (req, res, next) {
    try {
        var password = req.body.password;
    }
    catch (err) {
        throw next(err);
    }
};
exports.changePassword = changePassword;
