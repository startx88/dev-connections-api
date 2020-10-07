"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var errors_1 = require("../errors");
// authentication
var auth = function (req, res, next) {
    if (!req.currentUser) {
        throw new errors_1.AuthenticationError();
    }
    next();
};
exports.auth = auth;
