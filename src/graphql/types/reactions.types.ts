import { gql } from 'apollo-server-express';

export const reactionTypeDefs = gql`
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
