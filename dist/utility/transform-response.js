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
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRespnose = void 0;
var file_1 = require("./file");
// response body
var transformRespnose = function (data, dir) {
    if (!Array.isArray(data)) {
        delete data._doc.__v;
        return __assign(__assign({}, data._doc), { image: dir && file_1.noImage("uploads/" + dir + "/", data.image) });
    }
    return data.map(function (doc) {
        delete doc._doc.__v;
        return __assign(__assign({}, doc._doc), { image: dir && file_1.noImage("uploads/" + dir + "/", doc.image) });
    });
};
exports.transformRespnose = transformRespnose;
