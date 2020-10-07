"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = void 0;
var fs_1 = __importDefault(require("fs"));
var multer_1 = __importDefault(require("multer"));
var file_1 = require("./file");
var mkdirp_1 = __importDefault(require("mkdirp"));
// upload file
var uploader = function (dir, filterFiles) {
    var diskStorage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            if (!fs_1.default.existsSync("uploads/" + dir)) {
                mkdirp_1.default("uploads/" + dir);
            }
            cb(null, "uploads/" + dir);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now().toString() +
                "-" +
                file.originalname.replace(/\s+/, "-").toLowerCase());
        },
    });
    var upload = multer_1.default({
        storage: diskStorage,
        fileFilter: filterFiles ? filterFiles : file_1.filterFile,
    });
    return upload;
};
exports.uploader = uploader;
