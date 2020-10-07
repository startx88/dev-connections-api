"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var ejs_1 = __importDefault(require("ejs"));
var nodemailer = __importStar(require("nodemailer"));
var config_1 = require("../config");
var sgTransport = require("nodemailer-sendgrid-transport");
// Mailer class
var Mailer = /** @class */ (function () {
    function Mailer() {
        this._transport = nodemailer.createTransport(sgTransport({
            auth: {
                api_key: config_1.defautlConfig.EMAIL_API_KEY,
            },
        }));
    }
    Mailer.emailContainer = function (body) {
        var local = body.local, email = body.email, token = body.token, user = body.user, templateName = body.templateName;
        var mailer = new Mailer();
        var readTemplate = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "views/" + templateName + ".ejs"), "utf-8");
        var template = ejs_1.default.compile(readTemplate);
        var roles = ["admin", "superadmin"].includes(user.role);
        if (!roles) {
            mailer.sendMail({
                to: email,
                from: "arya.creativemind@gmail.com",
                subject: "Registration successfull",
                text: "Welcome " + user.firstname + " " + user.lastname,
                html: template({
                    email: email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    token: token,
                    localURL: local,
                }),
            });
        }
    };
    // send mail
    Mailer.prototype.sendMail = function (mailOptions) {
        this._transport.sendMail(mailOptions, function (err, info) {
            if (err) {
                return console.error("error: " + err);
            }
            console.log("Message Sent");
        });
    };
    return Mailer;
}());
exports.Mailer = Mailer;
