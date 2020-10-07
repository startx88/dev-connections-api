"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.addResume = exports.getGitProfile = exports.uploadImage = exports.deleteEmployment = exports.addEmployment = exports.deleteEducation = exports.addEducation = exports.updateStatus = exports.deleteProfile = exports.getProfileByUserId = exports.addUpdateProfile = exports.getProfile = exports.getUserProfiles = void 0;
var errors_1 = require("../errors");
var profile_1 = require("../models/profile");
var user_1 = require("../models/user");
var axios_1 = __importDefault(require("axios"));
var utility_1 = require("../utility");
var config_1 = require("../config");
/**
 * Get user profiles
 * @param req
 * @param res
 * @param next
 */
var getUserProfiles = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var page, PER_PAGE, totalItem, profiles, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                page = Number(req.query.page) || 1;
                PER_PAGE = 10;
                return [4 /*yield*/, profile_1.Profile.find().countDocuments()];
            case 1:
                totalItem = _a.sent();
                return [4 /*yield*/, profile_1.Profile.find()
                        .populate("user", "-password -token -expireToken")
                        .sort({ firstname: 1 })];
            case 2:
                profiles = _a.sent();
                return [2 /*return*/, res.status(200).json(utility_1.responseBody({
                        message: "All user profiles!",
                        currentPage: page,
                        total: totalItem,
                        hasPrev: page > 1,
                        next: page + 1,
                        prev: page - 1,
                        hasNext: page * PER_PAGE < totalItem,
                        data: utility_1.transformRespnose(profiles, "profile"),
                    }))];
            case 3:
                err_1 = _a.sent();
                throw next(err_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserProfiles = getUserProfiles;
/**
 * get profile by user id
 * @param req
 * @param res
 * @param next
 */
var getProfileByUserId = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.userId;
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId }).populate("user", "-password -token -expireToken")];
            case 1:
                profile = _a.sent();
                if (!profile) {
                    throw new errors_1.NotFoundError("there is not profile from this user id");
                }
                return [2 /*return*/, res.status(200).json(utility_1.responseBody({
                        message: "Fetch user profile",
                        data: utility_1.transformRespnose(profile, "profile"),
                    }))];
            case 2:
                err_2 = _a.sent();
                throw next(err_2);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProfileByUserId = getProfileByUserId;
/**
 * fetch currently logged in user profile
 * @param req
 * @param res
 * @param next
 */
var getProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, profile, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.currentUser.id;
                return [4 /*yield*/, user_1.User.findById(userId)];
            case 1:
                user = (_a.sent());
                return [4 /*yield*/, profile_1.Profile.findOne({
                        user: userId,
                    }).populate("user", "-password -token -expireToken")];
            case 2:
                profile = (_a.sent());
                if (user.role === "admin") {
                    throw new errors_1.BadRequestError("You are admin, you don't have any profile.");
                }
                if (!profile) {
                    throw new errors_1.NotFoundError("There is no profile for this user!");
                }
                return [2 /*return*/, res.status(200).json(utility_1.responseBody({
                        message: "Profile fetch",
                        data: utility_1.transformRespnose(profile, "profile"),
                    }))];
            case 3:
                err_3 = _a.sent();
                throw next(err_3);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProfile = getProfile;
// addUpdate profile
var addUpdateProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profileId, _a, status_1, company, designation, experience, salary, website, location_1, qualification, languages, skills, avatar, dob, gender, resume, hobbies, summary, gitusername, noticeperiod, profileInfo, profileExist, profile, hasProfile, profile, result, err_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                userId = (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id;
                profileId = req.params.profileId;
                _a = req.body, status_1 = _a.status, company = _a.company, designation = _a.designation, experience = _a.experience, salary = _a.salary, website = _a.website, location_1 = _a.location, qualification = _a.qualification, languages = _a.languages, skills = _a.skills, avatar = _a.avatar, dob = _a.dob, gender = _a.gender, resume = _a.resume, hobbies = _a.hobbies, summary = _a.summary, gitusername = _a.gitusername, noticeperiod = _a.noticeperiod;
                profileInfo = {
                    user: userId,
                    status: status_1,
                    company: company,
                    designation: designation,
                    experience: experience,
                    salary: salary,
                    website: website,
                    location: location_1,
                    qualification: qualification,
                    languages: languages,
                    skills: skills,
                    avatar: avatar,
                    dob: dob,
                    gender: gender,
                    resume: resume,
                    hobbies: hobbies,
                    summary: summary,
                    gitusername: gitusername,
                    noticeperiod: noticeperiod,
                };
                return [4 /*yield*/, profile_1.Profile.findOne({
                        _id: profileId,
                        user: userId,
                    })];
            case 1:
                profileExist = _c.sent();
                console.log(profileExist);
                if (!profileExist) return [3 /*break*/, 3];
                return [4 /*yield*/, profile_1.Profile.findOneAndUpdate({ user: userId }, { $set: profileInfo }, { new: true })];
            case 2:
                profile = _c.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Profile updated successfully",
                        id: profile === null || profile === void 0 ? void 0 : profile._id,
                        data: utility_1.transformRespnose(profileExist, "profile"),
                    }))];
            case 3: return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 4:
                hasProfile = _c.sent();
                if (hasProfile) {
                    throw new errors_1.BadRequestError("Profile already existed, Please update.");
                }
                profile = profile_1.Profile.build(__assign(__assign({}, profileInfo), { education: [], employment: [] }));
                return [4 /*yield*/, profile.save()];
            case 5:
                result = _c.sent();
                res.status(201).send(utility_1.responseBody({
                    message: "Profile added successfully",
                    data: utility_1.transformRespnose(profile, "profile"),
                }));
                _c.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_4 = _c.sent();
                throw next(err_4);
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.addUpdateProfile = addUpdateProfile;
// delete profile
var deleteProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.currentUser.id;
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 1:
                profile = _a.sent();
                if (!profile) {
                    throw new errors_1.NotFoundError("There is profile for this user");
                }
                return [4 /*yield*/, profile_1.Profile.findOneAndDelete({ user: userId })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Profile deleted",
                        id: profile._id,
                        data: utility_1.transformRespnose(result, "profile"),
                    }))];
        }
    });
}); };
exports.deleteProfile = deleteProfile;
//  profile
var updateStatus = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, profile, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                userId = req.currentUser.id;
                return [4 /*yield*/, user_1.User.findById(userId)];
            case 1:
                user = _a.sent();
                if ((user === null || user === void 0 ? void 0 : user.role) === "admin") {
                    throw new errors_1.BadRequestError("You are admin, you don't have any profile.");
                }
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 2:
                profile = _a.sent();
                if (!profile) {
                    console.log("profile");
                    throw new errors_1.NotFoundError("There is no profile found for this user");
                }
                profile.status = req.body.status;
                return [4 /*yield*/, profile.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "status updated",
                        id: profile._id,
                        data: utility_1.transformRespnose(profile, "profile"),
                    }))];
            case 4:
                err_5 = _a.sent();
                throw next(err_5);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateStatus = updateStatus;
// add educaction
var addEducation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile, _a, college, course, subject, board, medium, totalMarks, from, to, current, description, err_6;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                userId = req.currentUser.id;
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 1:
                profile = (_c.sent());
                _a = req.body, college = _a.college, course = _a.course, subject = _a.subject, board = _a.board, medium = _a.medium, totalMarks = _a.totalMarks, from = _a.from, to = _a.to, current = _a.current, description = _a.description;
                (_b = profile.education) === null || _b === void 0 ? void 0 : _b.unshift({
                    college: college,
                    course: course,
                    subject: subject,
                    board: board,
                    medium: medium,
                    totalMarks: totalMarks,
                    from: from,
                    to: to,
                    current: current,
                    description: description,
                });
                return [4 /*yield*/, profile.save()];
            case 2:
                _c.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "education added to the current user profile",
                        id: profile._id,
                        data: utility_1.transformRespnose(profile, "profile"),
                    }))];
            case 3:
                err_6 = _c.sent();
                throw next(err_6);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addEducation = addEducation;
// delete education
var deleteEducation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var educationId_1, userId, profile, educationUpdated, err_7;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                educationId_1 = req.params.educationId;
                userId = req.currentUser.id;
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 1:
                profile = (_b.sent());
                if (!profile) {
                    throw new errors_1.NotFoundError("Profile not found!");
                }
                educationUpdated = (_a = profile.education) === null || _a === void 0 ? void 0 : _a.filter(function (edu) { return edu._id.toString() !== educationId_1; });
                profile.education = educationUpdated;
                return [4 /*yield*/, profile.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "education deleted!",
                        data: profile,
                        id: educationId_1,
                    }))];
            case 3:
                err_7 = _b.sent();
                throw next(err_7);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteEducation = deleteEducation;
// add experience
var addEmployment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile, _a, company, designation, location_2, salary, skills, description, award, from, to, current, err_8;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                userId = req.currentUser.id;
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 1:
                profile = _c.sent();
                if (!profile) {
                    throw new errors_1.NotFoundError("Profile not found!");
                }
                _a = req.body, company = _a.company, designation = _a.designation, location_2 = _a.location, salary = _a.salary, skills = _a.skills, description = _a.description, award = _a.award, from = _a.from, to = _a.to, current = _a.current;
                (_b = profile.employment) === null || _b === void 0 ? void 0 : _b.unshift({
                    designation: designation,
                    company: company,
                    location: location_2,
                    salary: salary,
                    skills: skills,
                    description: description,
                    award: award,
                    from: from,
                    to: to,
                    current: current,
                });
                return [4 /*yield*/, profile.save()];
            case 2:
                _c.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Employment added to the profile!",
                        id: profile._id,
                        data: utility_1.transformRespnose(profile, "profile"),
                    }))];
            case 3:
                err_8 = _c.sent();
                throw next(err_8);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addEmployment = addEmployment;
// delete experience
var deleteEmployment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, employmentId_1, profile, existEmployment, employment, err_9;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                userId = req.currentUser.id;
                employmentId_1 = req.params.employmentId;
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 1:
                profile = _c.sent();
                if (!profile) {
                    throw new errors_1.NotFoundError("Profile not found!");
                }
                existEmployment = (_a = profile.employment) === null || _a === void 0 ? void 0 : _a.find(function (emp) { return emp._id.toString() === employmentId_1; });
                if (!existEmployment) {
                    throw new errors_1.BadRequestError("You can not delete another developer employment.");
                }
                employment = (_b = profile.employment) === null || _b === void 0 ? void 0 : _b.filter(function (emp) { return emp._id.toString() !== employmentId_1; });
                profile.employment = employment;
                return [4 /*yield*/, profile.save()];
            case 2:
                _c.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Employment deleted!",
                        id: employmentId_1,
                        data: utility_1.transformRespnose(profile, "profile"),
                    }))];
            case 3:
                err_9 = _c.sent();
                throw next(err_9);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteEmployment = deleteEmployment;
// upload avatar
var uploadImage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile, image, result, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.currentUser.id;
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 1:
                profile = (_a.sent());
                if (!profile) {
                    throw new errors_1.NotFoundError("Profile not found!");
                }
                image = req.file;
                if (!image) {
                    throw new errors_1.BadRequestError("Please select file!");
                }
                if (image) {
                    utility_1.deleteFile(profile.avatar);
                    profile.avatar = image.path;
                }
                return [4 /*yield*/, profile.save()];
            case 2:
                result = _a.sent();
                if (result) {
                    utility_1.resizeImage(image.path, 250, 140);
                }
                return [2 /*return*/, res.status(200).json({
                        message: "File uploaded",
                        idd: profile._id,
                        data: utility_1.transformRespnose(profile, "profile"),
                    })];
            case 3:
                err_10 = _a.sent();
                throw next(err_10);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.uploadImage = uploadImage;
var getGitProfileById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile, err_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.currentUser.id;
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 1:
                profile = _a.sent();
                if (!profile) {
                    throw new errors_1.NotFoundError("Profile not found!");
                }
                return [3 /*break*/, 3];
            case 2:
                err_11 = _a.sent();
                throw next(err_11);
            case 3: return [2 /*return*/];
        }
    });
}); };
// ADD AVATAR
var getGitProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile, uri, response, err_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.currentUser.id;
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 1:
                profile = _a.sent();
                if (!profile) {
                    throw new errors_1.NotFoundError("Profile not found!");
                }
                uri = "https://api.github.com/users/" + req.params.username + "/repos?per_page=10&sort=created:asc&\n    client_id=" + config_1.defautlConfig.GITHUB_CLIENT_ID + "&client_secret=" + config_1.defautlConfig.GITHUB_CLIENT_ID;
                return [4 /*yield*/, axios_1.default.get(uri, {
                        headers: { "user-agent": "node-js" },
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Github profile fetched!",
                        data: response.data,
                    }))];
            case 3:
                err_12 = _a.sent();
                throw next(err_12);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getGitProfile = getGitProfile;
var addResume = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, profile, file, err_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = req.currentUser.id;
                return [4 /*yield*/, profile_1.Profile.findOne({ user: userId })];
            case 1:
                profile = _a.sent();
                file = req.file;
                if (!profile) {
                    utility_1.deleteFile(file.path);
                    throw new errors_1.NotFoundError("Profile not found!");
                }
                if (!file) {
                    throw new errors_1.BadRequestError("Please select file!");
                }
                if (file) {
                    utility_1.deleteFile(profile.resume);
                    profile.resume = file.path;
                }
                return [4 /*yield*/, profile.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send(utility_1.responseBody({
                        message: "Resume uploded!",
                        id: profile._id,
                        data: utility_1.transformRespnose(profile, "profile"),
                    }))];
            case 3:
                err_13 = _a.sent();
                throw next(err_13);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addResume = addResume;
