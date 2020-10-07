"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
// Jwt class
var JWT = /** @class */ (function () {
    function JWT(user) {
        this.user = user;
    }
    // generate token
    JWT.prototype.generateToken = function (hour) {
        var _a, _b;
        if (hour === void 0) { hour = 1; }
        var token = jsonwebtoken_1.default.sign({ email: (_a = this.user) === null || _a === void 0 ? void 0 : _a.email, id: (_b = this.user) === null || _b === void 0 ? void 0 : _b._id }, config_1.defautlConfig.SECRET_KEY, { expiresIn: hour + "h" });
        return token;
    };
    // verity jwt token
    JWT.prototype.verifyJwtToken = function (token) {
        return jsonwebtoken_1.default.verify(token, config_1.defautlConfig.SECRET_KEY);
    };
    return JWT;
}());
exports.JWT = JWT;
