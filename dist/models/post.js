"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
// schema
var Schema = mongoose_1.default.Schema;
// post schema
var postSchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    active: { type: Boolean, default: true },
    likes: [
        {
            user: { type: Schema.Types.ObjectId, ref: "User" },
            active: { type: Boolean, default: false },
        },
    ],
    comments: [
        {
            user: { type: Schema.Types.ObjectId, ref: "User" },
            name: { type: String, required: true },
            message: { type: String, required: true },
            avatar: { type: String },
            status: {
                type: String,
                default: "pending",
                enum: ["pending", "approved", "rejected"],
            },
            insertAt: { type: Date, default: Date.now },
        },
    ],
    insertAt: { type: Date, default: Date.now },
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
        },
    },
});
// static methods
postSchema.statics.build = function (attr) {
    return new Post(attr);
};
// export schema
var Post = mongoose_1.default.model("Post", postSchema);
exports.Post = Post;
