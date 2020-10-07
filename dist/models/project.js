"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
// project schemas
var projectSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String },
    project: { type: String, required: true },
    active: { type: Boolean, default: true },
    insertAt: { type: String, default: Date.now },
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
        },
    },
});
// static methods
projectSchema.statics.build = function (attr) {
    return new Project(attr);
};
// model
var Project = mongoose_1.default.model("Project", projectSchema);
