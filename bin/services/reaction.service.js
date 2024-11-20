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
const reaction_model_1 = __importDefault(require("../models/reaction.model"));
const ReactionDoesNotExistError_1 = __importDefault(require("../exceptions/ReactionDoesNotExistError"));
const user_model_1 = __importDefault(require("../models/user.model"));
const UserDoesNotExistsError_1 = __importDefault(require("../exceptions/UserDoesNotExistsError"));
const NotYourComment_1 = __importDefault(require("../exceptions/NotYourComment"));
class ReactionService {
    create(reactionInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reaction = yield reaction_model_1.default.create(reactionInput);
                return reaction;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reaction = yield reaction_model_1.default.findById(id);
                if (!reaction) {
                    throw new ReactionDoesNotExistError_1.default("Reaction does not exist");
                }
                return reaction;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reactions = yield reaction_model_1.default.find();
                return reactions;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reaction = yield reaction_model_1.default.findById(id);
                const user = yield user_model_1.default.findById(userId);
                if (!reaction) {
                    throw new ReactionDoesNotExistError_1.default("Reaction does not exist");
                }
                if (!user) {
                    throw new UserDoesNotExistsError_1.default("User does not exist");
                }
                if (user.id != reaction.userId) {
                    throw new NotYourComment_1.default("Reaction is not yours");
                }
                yield reaction_model_1.default.findByIdAndDelete(id);
                return reaction;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new ReactionService();
