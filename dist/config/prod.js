"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodConfig = void 0;
var prodConfig = {
    DB: "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@ds135974.mlab.com:35974/" + process.env.DATABASE,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
};
exports.prodConfig = prodConfig;
