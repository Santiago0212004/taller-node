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
exports.commentResolvers = void 0;
const comment_service_1 = __importDefault(require("../../services/comment.service"));
const apollo_server_express_1 = require("apollo-server-express");
exports.commentResolvers = {
    Query: {
        getComment: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const comment = yield comment_service_1.default.get(id);
            return comment;
        }),
        getComments: (_root) => __awaiter(void 0, void 0, void 0, function* () {
            return yield comment_service_1.default.findAll();
        })
    },
    Mutation: {
        createComment: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { input }, context) {
            const token = context.user;
            if (!token) {
                throw new apollo_server_express_1.AuthenticationError("Unauthorized");
            }
            const comment = Object.assign({ userId: token.id }, input);
            const newComment = yield comment_service_1.default.create(comment);
            return newComment;
        }),
        updateComment: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { input }, context) {
            const token = context.user;
            if (!token) {
                throw new apollo_server_express_1.AuthenticationError("Unauthorized");
            }
            const { id, content, parentId } = input;
            const commentUpdate = {
                userId: token.id,
                content,
                parentId
            };
            const updatedComment = yield comment_service_1.default.update(id, token.id, commentUpdate);
            return updatedComment;
        }),
        deleteComment: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { id }, context) {
            const token = context.user;
            if (!token) {
                throw new apollo_server_express_1.AuthenticationError("Unauthorized");
            }
            const deletedComment = yield comment_service_1.default.delete(id, token.id);
            return deletedComment;
        })
    }
};
