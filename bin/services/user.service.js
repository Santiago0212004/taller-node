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
exports.actualUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const UserExistsError_1 = __importDefault(require("../exceptions/UserExistsError"));
const UserDoesNotExistsError_1 = __importDefault(require("../exceptions/UserDoesNotExistsError"));
exports.actualUser = "";
class UserService {
    create(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findByEmail(userInput.email);
                if (userExists)
                    throw new UserExistsError_1.default("User already exists");
                userInput.password = yield bcrypt_1.default.hash(userInput.password, 10);
                const user = yield user_model_1.default.create(userInput);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    login(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield this.findByEmail(userInput.email);
                if (!userExists)
                    throw new UserDoesNotExistsError_1.default("User does not exists");
                const isMatch = yield bcrypt_1.default.compare(userInput.password, userExists.password);
                if (!isMatch)
                    throw new ReferenceError("Not authorized");
                exports.actualUser = userExists.id;
                return {
                    email: userExists.email,
                    id: userExists._id,
                    token: this.generateToken(userExists)
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ email });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(id);
                if (!user)
                    throw new UserDoesNotExistsError_1.default("User does not exists");
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(id);
                if (!user)
                    throw new UserDoesNotExistsError_1.default("User does not exists");
                yield user_model_1.default.findOneAndUpdate({ _id: id }, userInput, { returnOriginal: false });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(id);
                if (!user)
                    throw new UserDoesNotExistsError_1.default("User does not exists");
                yield user_model_1.default.findByIdAndDelete(id);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateToken(user) {
        try {
            return jsonwebtoken_1.default.sign({ id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "2m" });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new UserService();
