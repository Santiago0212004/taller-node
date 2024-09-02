"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
const validateSchema_1 = __importDefault(require("../middlewares/validateSchema"));
const comment_schema_1 = __importDefault(require("../schemas/comment.schema"));
const auth_1 = __importDefault(require("../middlewares/auth"));
exports.router = express_1.default.Router();
// para crear un nuevo comentario
exports.router.post("/create", (0, auth_1.default)(['user', 'superuser']), (0, validateSchema_1.default)(comment_schema_1.default), comment_controller_1.default.create);
// para obtener todos los comentarios
exports.router.get("/", (0, auth_1.default)(['user', 'superuser']), comment_controller_1.default.getAll);
// Para obtener, actualizar o eliminar un comentario por ID(solo el autor del comentario o superuser)
exports.router.get("/get/:commentId", (0, auth_1.default)(['user', 'superuser']), comment_controller_1.default.get);
exports.router.put("/update/:commentId", (0, auth_1.default)(['user', 'superuser']), comment_controller_1.default.update);
exports.router.delete("/delete/:commentId", (0, auth_1.default)(['user', 'superuser']), comment_controller_1.default.delete);
// Responder a un comentario
exports.router.post("/:commentId/reply", (0, auth_1.default)(['user', 'superuser']), (0, validateSchema_1.default)(comment_schema_1.default), comment_controller_1.default.reply);
exports.default = exports.router;
