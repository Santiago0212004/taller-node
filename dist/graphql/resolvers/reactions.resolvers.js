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
exports.reactionResolvers = void 0;
const reaction_service_1 = __importDefault(require("../../services/reaction.service"));
const apollo_server_express_1 = require("apollo-server-express");
exports.reactionResolvers = {
    Query: {
        getReactions: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield reaction_service_1.default.findAll();
        }),
        getReaction: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { reactionId }) {
            return yield reaction_service_1.default.get(reactionId);
        }),
    },
    Mutation: {
        createReaction: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { input }, context) {
            const user = context.user;
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError("Unauthorized");
            }
            const reactionInput = Object.assign(Object.assign({}, input), { userId: user.id });
            return yield reaction_service_1.default.create(reactionInput);
        }),
        deleteReaction: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { reactionId }, context) {
            const user = context.user;
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError("Unauthorized");
            }
            return yield reaction_service_1.default.delete(reactionId, user.id);
        }),
    },
};
