"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongodb_1 = require("mongodb");
const commentSchema = (0, zod_1.object)({
    content: (0, zod_1.string)({ required_error: "Content is required" })
        .min(1, "Content must not be empty"),
    parentId: (0, zod_1.union)([(0, zod_1.string)().refine((value) => mongodb_1.ObjectId.isValid(value), {
            message: "Parent ID must be a valid ObjectId if provided"
        }), (0, zod_1.optional)((0, zod_1.string)())]).nullable()
});
exports.default = commentSchema;
