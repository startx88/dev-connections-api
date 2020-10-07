"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defautlConfig = void 0;
var merge_1 = __importDefault(require("lodash/merge"));
var dev_1 = require("./dev");
var prod_1 = require("./prod");
process.env.NODE_ENV = process.env.NODE_ENV || "development";
var env = process.env.NODE_ENV;
// global configuration
var globalConfig = {
    EMAIL_API_KEY: process.env.EMAIL_API_KEY,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_SECRET_ID: process.env.GITHUB_SECRET_ID,
};
// configuration
var config = {};
switch (env) {
    case "production":
    case "prod":
        config = prod_1.prodConfig;
    default:
        config = dev_1.devConfig;
}
// export
var defautlConfig = merge_1.default(globalConfig, config);
exports.defautlConfig = defautlConfig;
