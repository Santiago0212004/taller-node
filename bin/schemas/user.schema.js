"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = (0, zod_1.object)({
    name: (0, zod_1.string)({ required_error: "Name is required" }),
    email: (0, zod_1.string)({ required_error: "Email is required" })
        .email("Not a valid email address"),
    password: (0, zod_1.string)({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters long"),
    role: (0, zod_1.string)({ required_error: "Role is required" })
        .refine((value) => value === 'user' || value === 'superuser', {
        message: "Role must be either 'user' or 'superuser'"
    }),
    isActive: (0, zod_1.boolean)({ required_error: "isActive is required" }),
});
exports.default = userSchema;
