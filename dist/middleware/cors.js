"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
var cors = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
};
exports.cors = cors;
