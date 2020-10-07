"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
require("express-async-errors");
var db_1 = require("./db");
var middleware_1 = require("./middleware");
var auth_1 = require("./routes/auth");
var profile_1 = require("./routes/profile");
var skill_1 = require("./routes/skill");
var designation_1 = require("./routes/designation");
var errors_1 = require("./errors");
var user_1 = require("./routes/user");
var post_1 = require("./routes/post");
var admin_1 = require("./routes/admin");
var category_1 = require("./routes/category");
// app
var app = express_1.default();
// constant
app.set("title", "shopkart-api");
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.resolve(__dirname, "..", "uploads")));
app.use(express_1.default.static(path_1.default.resolve(__dirname, "..", "public")));
// cors
var _a = process.env, _b = _a.PORT, PORT = _b === void 0 ? process.env.PORT || 4200 : _b, _c = _a.SECRET_KEY, SECRET_KEY = _c === void 0 ? process.env.SECRET_KEY : _c;
app.use(middleware_1.cors);
app.use(function (req, res, next) {
    if ("production" === app.get("env")) {
        res.locals.localURL = "https://dev-connection-api.herokuapp.com";
    }
    else {
        res.locals.localURL = "http://localhost:4200";
    }
    next();
});
if (app.get("env")) {
    app.get("/template", function (req, res, next) {
        res.render("confirm", {
            title: "Forgot password",
            year: new Date().getFullYear(),
            token: "dfasdfasdfdf",
            userId: "fjdsklfjd",
            fullname: "Pradeep Kumar",
        });
    });
}
// routes
// routes
app.use("/api/auth", auth_1.authRouter);
app.use("/api/user", user_1.userRouter);
app.use("/api/profile", profile_1.profileRouter);
app.use("/api/skill", skill_1.skillRouter);
app.use("/api/designation", designation_1.designationRouter);
app.use("/api/post", post_1.postRouter);
app.use("/api/admin", admin_1.adminRouter);
app.use("/api/category", category_1.categoryRouter);
// error handler
// Error
app.all("*", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        throw next(new errors_1.NotFoundError("Not found"));
    });
}); });
app.use(middleware_1.errorHandler);
// listen
db_1.connectDb(function () {
    app.listen(PORT, function () {
        console.log("Server is running...", PORT);
    });
});
