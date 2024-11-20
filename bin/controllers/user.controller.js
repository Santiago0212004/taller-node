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
const user_service_1 = __importDefault(require("../services/user.service"));
const UserExistsError_1 = __importDefault(require("../exceptions/UserExistsError"));
const UserDoesNotExistsError_1 = __importDefault(require("../exceptions/UserDoesNotExistsError"));
class userController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.create(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                if (error instanceof UserExistsError_1.default) {
                    res.status(400).json({ message: "User already exists" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resObj = yield user_service_1.default.login(req.body);
                res.status(200).json(resObj);
            }
            catch (error) {
                if (error instanceof UserDoesNotExistsError_1.default) {
                    res.status(400).json({ message: "User does not exists" });
                    return;
                }
                else if (error instanceof ReferenceError) {
                    res.status(401).json({ message: "Not authorized" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.get(req.params.id);
                res.json(user);
            }
            catch (error) {
                if (error instanceof UserDoesNotExistsError_1.default) {
                    res.status(400).json({ message: "User does not exists" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.findAll();
                res.json(users);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_service_1.default.update(req.params.userId, req.body);
                res.json(user);
            }
            catch (error) {
                if (error instanceof UserDoesNotExistsError_1.default) {
                    res.status(400).json({ message: "User does not exists" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const user = yield user_service_1.default.delete(userId);
                res.json(user);
            }
            catch (error) {
                if (error instanceof UserDoesNotExistsError_1.default) {
                    res.status(400).json({ message: "User does not exists" });
                    return;
                }
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new userController();
