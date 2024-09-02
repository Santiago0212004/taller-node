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
const user_model_1 = __importDefault(require("../models/user.model"));
const comment_model_1 = __importDefault(require("../models/comment.model"));
const CommentDoesNotExistError_1 = __importDefault(require("../exceptions/CommentDoesNotExistError"));
const UserDoesNotExistsError_1 = __importDefault(require("../exceptions/UserDoesNotExistsError"));
const NotYourComment_1 = __importDefault(require("../exceptions/NotYourComment"));
class CommentService {
    create(commentInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_model_1.default.create(commentInput);
                return comment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_model_1.default.findById(id);
                if (!comment) {
                    throw new CommentDoesNotExistError_1.default("Comment does not exist");
                }
                return comment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield comment_model_1.default.find();
                return comments;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, userId, commentInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_model_1.default.findById(id);
                const user = yield user_model_1.default.findById(userId);
                if (!comment) {
                    throw new CommentDoesNotExistError_1.default("Comment does not exist");
                }
                if (!user) {
                    throw new UserDoesNotExistsError_1.default("User does not exist");
                }
                if (user.id != comment.userId && user.role != "superuser") {
                    throw new NotYourComment_1.default("Comment is not yours");
                }
                yield comment_model_1.default.findOneAndUpdate({ _id: id }, commentInput, { returnOriginal: false });
                return comment;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_model_1.default.findById(id);
                const user = yield user_model_1.default.findById(userId);
                if (!comment) {
                    throw new CommentDoesNotExistError_1.default("Comment does not exist");
                }
                if (!user) {
                    throw new UserDoesNotExistsError_1.default("User does not exist");
                }
                if (user.id != comment.userId && user.role != "superuser") {
                    throw new NotYourComment_1.default("Comment is not yours");
                }
                yield comment_model_1.default.findByIdAndDelete(id);
                return comment;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new CommentService();
