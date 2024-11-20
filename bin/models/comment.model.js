"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    parentId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Comment' },
}, { timestamps: true, collection: "comments" });
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.default = Comment;
