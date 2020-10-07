"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schmea = mongoose_1.default.Schema;
// category schema
var categorySchema = new Schmea({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    active: { type: Boolean, default: true },
    insertAt: { type: Date, default: Date.now },
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
        },
    },
});
// static methods
categorySchema.statics.build = function (attr) {
    return new Category(attr);
};
// category
var Category = mongoose_1.default.model("Category", categorySchema);
exports.Category = Category;
