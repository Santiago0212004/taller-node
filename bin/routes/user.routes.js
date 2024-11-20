"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const login_schema_1 = __importDefault(require("../schemas/login.schema"));
const auth_1 = __importDefault(require("../middlewares/auth"));
exports.router = express_1.default.Router();
//Login
exports.router.post("/login", (0, validateSchema_1.default)(login_schema_1.default), user_controller_1.default.login);
//SuperUser endpoints
exports.router.post("/create", (0, auth_1.default)(['superuser']), (0, validateSchema_1.default)(user_schema_1.default), user_controller_1.default.create);
exports.router.put("/update/:userId", (0, auth_1.default)(['superuser']), user_controller_1.default.update);
exports.router.delete("/delete/:userId", (0, auth_1.default)(['superuser']), user_controller_1.default.delete);
//All users endpoints
exports.router.get("/", (0, auth_1.default)(['user', 'superuser']), user_controller_1.default.getAll);
exports.router.get("/profile", (0, auth_1.default)(['user', 'superuser']), user_controller_1.default.get);
