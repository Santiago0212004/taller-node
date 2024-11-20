"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.MONGO_URL || "mongodb://localhost:27017/nodejs";
exports.db = mongoose_1.default.connect(connectionString)
    .then(() => console.log(`Connected to ${connectionString}`)).catch((err) => console.log(err));
