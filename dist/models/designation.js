"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Designation = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
// skills schema
var designationSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    active: { type: Boolean, default: true },
    insertAt: { type: Date, default: Date.now },
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret._doc.__v;
        },
    },
});
// statics method
designationSchema.statics.build = function (attr) {
    return new Designation(attr);
};
// skills
var Designation = mongoose_1.default.model("Designation", designationSchema);
exports.Designation = Designation;
