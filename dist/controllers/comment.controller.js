"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_service_1 = __importDefault(require("../services/comment.service"));
const CommentDoesNotExistError_1 = __importDefault(require("../exceptions/CommentDoesNotExistError"));
const NotYourComment_1 = __importDefault(require("../exceptions/NotYourComment"));
class CommentController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.userId = req.params.id;
                const comment = yield comment_service_1.default.create(req.body);
                res.status(201).json(comment);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_service_1.default.get(req.params.commentId);
                res.json(comment);
            }
            catch (error) {
                if (error instanceof CommentDoesNotExistError_1.default) {
                    res.status(400).json({ message: "Comment does not exist" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comment_service_1.default.findAll();
                res.json(comments);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_service_1.default.update(req.params.commentId, req.params.id, req.body);
                if (!comment) {
                    res.status(404).json({ message: "Comment does not exist" });
                    return;
                }
                res.json(comment);
            }
            catch (error) {
                if (error instanceof CommentDoesNotExistError_1.default) {
                    res.status(400).json({ message: "Comment does not exist" });
                    return;
                }
                if (error instanceof NotYourComment_1.default) {
                    res.status(400).json({ message: "Comment is not yours" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = req.params.commentId;
                const comment = yield comment_service_1.default.delete(commentId, req.params.id);
                if (!comment) {
                    res.status(404).json({ message: "Comment does not exist" });
                    return;
                }
                res.json(comment);
            }
            catch (error) {
                if (error instanceof CommentDoesNotExistError_1.default) {
                    res.status(400).json({ message: "Comment does not exist" });
                    return;
                }
                if (error instanceof NotYourComment_1.default) {
                    res.status(400).json({ message: "Comment is not yours" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    reply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parentId = req.params.commentId;
                const userId_ = req.params.id;
                const comment = yield comment_service_1.default.create(Object.assign(Object.assign({}, req.body), { parentId }).userId = userId_);
                res.status(201).json(comment);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new CommentController();
