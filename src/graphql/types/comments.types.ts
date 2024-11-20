import { gql } from 'apollo-server-express';

export const commentTypeDefs = gql`
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
