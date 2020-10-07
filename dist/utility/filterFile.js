"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterFile = void 0;
var FilterFile = /** @class */ (function () {
    function FilterFile(regExp, message) {
        this.regExp = regExp;
        this.message = message;
    }
    // filter file
    FilterFile.prototype.fileFilter = function (req, file, cb) {
        if (!file.originalname.match(this.regExp)) {
            return cb(new Error(this.message));
        }
        return cb(null, true);
    };
    return FilterFile;
}());
exports.FilterFile = FilterFile;
