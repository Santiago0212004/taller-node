"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.commentTypeDefs = (0, apollo_server_express_1.gql) `
input CommentInput{
    content: String!
    parentId: ID
}

input UpdateComment{
    id: ID!
    content: String!
    parentId: ID
}

type Comment{
    id:ID!
    userId: ID!
    content: String!
    parentId: ID
    createdAt: String!
    updatedAt: String!
}

type Query{
    getComment(id: ID!): Comment
    getComments:[Comment]
}

type Mutation{
    createComment(input:CommentInput):Comment
    deleteComment(id: ID!):Comment
    updateComment(input:UpdateComment): Comment
}`;
