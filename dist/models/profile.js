"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
// profile schema
var Schema = mongoose_1.default.Schema;
// Profile Schema
var ProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    status: { type: String, default: "Welcome to dev connections" },
    company: { type: String, required: true },
    designation: { type: String, required: true },
    experience: { type: String, required: true },
    salary: { type: String, required: true },
    website: { type: String },
    location: { type: String, required: true },
    qualification: { type: String, required: true },
    languages: [
        {
            code: { type: String },
            name: { type: String },
            options: { type: [String] },
        },
    ],
    skills: [
        {
            title: { type: String },
            proficiency: {
                type: String,
                default: "beginer",
                enum: ["beginer", "intermediate", "expert"],
            },
            rating: {
                type: Number,
                default: 0,
                enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
        },
    ],
    avatar: { type: String },
    dob: { type: String },
    gender: {
        type: String,
        required: true,
        default: "unknown",
        enum: ["male", "female", "unknown"],
    },
    resume: { type: String },
    hobbies: { type: [String] },
    summary: { type: String },
    gitusername: { type: String },
    noticeperiod: { type: String },
    employment: [
        {
            designation: { type: String, required: true },
            company: { type: String, required: true },
            location: { type: String, required: true },
            salary: { type: String, required: true },
            skills: { type: [String], default: [] },
            description: { type: String, default: "" },
            award: [{
                    title: String,
                    rating: Number,
                    image: String,
                }],
            from: { type: Date, default: Date.now },
            to: { type: Date, default: null },
            current: Boolean,
        },
    ],
    education: [
        {
            college: { type: String, required: true },
            course: { type: String, required: true },
            subject: { type: [String], required: true },
            board: { type: String, default: "" },
            medium: { type: String, default: "" },
            totalMarks: { type: String, default: 0 },
            from: { type: Date, default: Date.now },
            to: { type: Date, default: null },
            current: { type: Boolean, default: false },
            description: { type: String, default: "" },
        },
    ],
    active: { type: Boolean, default: true },
    insertAt: { type: Date, default: Date.now },
});
// scatic methods
ProfileSchema.statics.build = function (attr) {
    return new Profile(attr);
};
// export model
var Profile = mongoose_1.default.model("Profile", ProfileSchema);
exports.Profile = Profile;
