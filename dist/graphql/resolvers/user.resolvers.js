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
exports.userResolvers = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const user_service_1 = __importDefault(require("../../services/user.service"));
const UserExistsError_1 = __importDefault(require("../../exceptions/UserExistsError"));
const UserDoesNotExistsError_1 = __importDefault(require("../../exceptions/UserDoesNotExistsError"));
exports.userResolvers = {
    Query: {
        users: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authenticated');
            }
            if (!['user', 'superuser'].includes(context.user.role)) {
                throw new apollo_server_express_1.ForbiddenError('Not authorized');
            }
            return yield user_service_1.default.findAll();
        }),
        user: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { id }, context) {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authenticated');
            }
            if (!['user', 'superuser'].includes(context.user.role)) {
                throw new apollo_server_express_1.ForbiddenError('Not authorized');
            }
            try {
                return yield user_service_1.default.get(id);
            }
            catch (error) {
                if (error instanceof UserDoesNotExistsError_1.default) {
                    throw new Error('User does not exist');
                }
                throw error;
            }
        }),
        me: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new apollo_server_express_1.AuthenticationError('Not authenticated');
            }
            try {
                return yield user_service_1.default.get(context.user.id);
            }
            catch (error) {
                if (error instanceof UserDoesNotExistsError_1.default) {
                    throw new Error('User does not exist');
                }
                throw error;
            }
        }),
    },
    Mutation: {
        register: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { input }, context) {
            if (!context.user || context.user.role !== 'superuser') {
                throw new apollo_server_express_1.ForbiddenError('Not authorized');
            }
            try {
                return yield user_service_1.default.create(input);
            }
            catch (error) {
                if (error instanceof UserExistsError_1.default) {
                    throw new Error('User already exists');
                }
                throw error;
            }
        }),
        login: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            try {
                const result = yield user_service_1.default.login(input);
                return {
                    token: result.token,
                    user: yield user_service_1.default.get(result.id)
                };
            }
            catch (error) {
                if (error instanceof UserDoesNotExistsError_1.default) {
                    throw new Error('User does not exist');
                }
                if (error instanceof ReferenceError) {
                    throw new apollo_server_express_1.AuthenticationError('Invalid credentials');
                }
                throw error;
            }
        }),
        updateUser: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { id, input }, context) {
            if (!context.user || context.user.role !== 'superuser') {
                throw new apollo_server_express_1.ForbiddenError('Not authorized');
            }
            try {
                const updatedUser = yield user_service_1.default.update(id, input);
                if (!updatedUser) {
                    throw new Error('User does not exist');
                }
                return updatedUser;
            }
            catch (error) {
                if (error instanceof UserDoesNotExistsError_1.default) {
                    throw new Error('User does not exist');
                }
                throw error;
            }
        }),
        deleteUser: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { id }, context) {
            if (!context.user || context.user.role !== 'superuser') {
                throw new apollo_server_express_1.ForbiddenError('Not authorized');
            }
            try {
                const deletedUser = yield user_service_1.default.delete(id);
                if (!deletedUser) {
                    throw new Error('User does not exist');
                }
                return deletedUser;
            }
            catch (error) {
                if (error instanceof UserDoesNotExistsError_1.default) {
                    throw new Error('User does not exist');
                }
                throw error;
            }
        }),
    },
};
