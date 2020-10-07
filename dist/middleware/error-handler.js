"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var custom_error_1 = require("../errors/custom-error");
// error handler
var errorHandler = function (error, req, res, next) {
    console.log("err", error);
    if (error instanceof custom_error_1.CustomError) {
        return res
            .status(error.statusCode)
            .send({ errors: error.errorSerialize() });
    }
    res.send({
        error: "Something went wrong",
    });
};
exports.errorHandler = errorHandler;
