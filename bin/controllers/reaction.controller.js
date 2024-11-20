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
const reaction_service_1 = __importDefault(require("../services/reaction.service"));
const ReactionDoesNotExistError_1 = __importDefault(require("../exceptions/ReactionDoesNotExistError"));
const NotYourComment_1 = __importDefault(require("../exceptions/NotYourComment"));
class ReactionController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.userId = req.params.id;
                const reaction = yield reaction_service_1.default.create(req.body);
                res.status(201).json(reaction);
            }
            catch (error) {
                throw error;
                res.status(500).json(error);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reaction = yield reaction_service_1.default.get(req.params.reactionId);
                res.json(reaction);
            }
            catch (error) {
                if (error instanceof ReactionDoesNotExistError_1.default) {
                    res.status(400).json({ message: "Reaction does not exist" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reactions = yield reaction_service_1.default.findAll();
                res.json(reactions);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reactionId = req.params.reactionId;
                const reaction = yield reaction_service_1.default.delete(reactionId, req.params.id);
                if (!reaction) {
                    res.status(404).json({ message: "Reaction does not exist" });
                    return;
                }
                res.json(reaction);
            }
            catch (error) {
                if (error instanceof ReactionDoesNotExistError_1.default) {
                    res.status(400).json({ message: "Reaction does not exist" });
                    return;
                }
                if (error instanceof NotYourComment_1.default) {
                    res.status(400).json({ message: "Reaction is not yours" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new ReactionController();
