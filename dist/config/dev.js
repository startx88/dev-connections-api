"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConfig = void 0;
var devConfig = {
    DB: "mongodb://localhost:27017/devconnections",
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
};
exports.devConfig = devConfig;
