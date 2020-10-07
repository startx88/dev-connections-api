"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var errors_1 = require("../errors");
var currentUser = function (req, res, next) {
    var header = req.get("Authorization");
    // header
    if (!header) {
        throw new errors_1.AuthenticationError();
    }
    // get token
    var token = header.split(" ")[1];
    var verify = null;
    try {
        verify = jsonwebtoken_1.default.verify(token, config_1.defautlConfig.SECRET_KEY);
    }
    catch (err) {
        throw new errors_1.AuthenticationError();
    }
    req.currentUser = verify;
    if (!verify) {
        throw new errors_1.AuthenticationError();
    }
    // assign logged in user value
    next();
};
exports.currentUser = currentUser;
