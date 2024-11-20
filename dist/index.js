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
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const user_types_1 = require("./graphql/types/user.types");
const user_resolvers_1 = require("./graphql/resolvers/user.resolvers");
const reactions_types_1 = require("./graphql/types/reactions.types");
const reactions_resolvers_1 = require("./graphql/resolvers/reactions.resolvers");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const comment_routes_1 = require("./routes/comment.routes");
const reaction_routes_1 = require("./routes/reaction.routes");
const comments_types_1 = require("./graphql/types/comments.types");
const comments_resolvers_1 = require("./graphql/resolvers/comments.resolvers");
dotenv_1.default.config();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // Middleware
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        // GraphQL Server Setup
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: [user_types_1.userTypeDefs, reactions_types_1.reactionTypeDefs, comments_types_1.commentTypeDefs],
            resolvers: [user_resolvers_1.userResolvers, reactions_resolvers_1.reactionResolvers, comments_resolvers_1.commentResolvers],
            context: ({ req }) => {
                const token = req.headers.authorization || '';
                if (!token) {
                    return { user: null };
                }
                try {
                    const user = jsonwebtoken_1.default.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET || 'secret');
                    return { user };
                }
                catch (error) {
                    return { user: null };
                }
            },
        });
        yield server.start();
        // Apply GraphQL middleware
        server.applyMiddleware({ app });
        // REST Routes
        app.use('/api/comments', comment_routes_1.router);
        app.use('/api/reaction', reaction_routes_1.router);
        // Connect to database and start server
        db_1.db.then(() => {
            app.listen(process.env.PORT || 3000, () => {
                console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3000}`);
                console.log(`📊 GraphQL endpoint at http://localhost:${process.env.PORT || 3000}${server.graphqlPath}`);
            });
        });
    });
}
startServer();
