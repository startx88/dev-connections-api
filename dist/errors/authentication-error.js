"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
var custom_error_1 = require("./custom-error");
// Bad request error
var AuthenticationError = /** @class */ (function (_super) {
    __extends(AuthenticationError, _super);
    function AuthenticationError(message) {
        if (message === void 0) { message = "Not Authorized"; }
        var _this = _super.call(this, "Not authorized") || this;
        _this.message = message;
        _this.statusCode = 401;
        Object.setPrototypeOf(_this, AuthenticationError.prototype);
        return _this;
    }
    AuthenticationError.prototype.errorSerialize = function () {
        return [{ message: this.message }];
    };
    return AuthenticationError;
}(custom_error_1.CustomError));
exports.AuthenticationError = AuthenticationError;
