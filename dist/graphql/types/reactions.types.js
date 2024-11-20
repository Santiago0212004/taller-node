"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.reactionTypeDefs = (0, apollo_server_express_1.gql) `
  type Reaction {
    id: ID!
    userId: ID!
    content: String!
    parentId: ID
    createdAt: String!
    updatedAt: String!
  }

  input ReactionInput {
    userId: ID!
    content: String!
    parentId: ID
  }

  type Query {
    getReactions: [Reaction!]
    getReaction(reactionId: ID!): Reaction
  }

  type Mutation {
    createReaction(input: ReactionInput!): Reaction!
    deleteReaction(reactionId: ID!): Reaction
  }
`;
