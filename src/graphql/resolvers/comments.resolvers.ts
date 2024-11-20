import { CommentInput, CommentDocument } from "../../models/comment.model"
import  commentService  from "../../services/comment.service"
import { AuthenticationError } from "apollo-server-express";

export const commentResolvers = {
    Query: {
        getComment: async (_: any, { id }: { id: string }) => {
            const comment: CommentDocument | null = await commentService.get(id);
            return comment;
        }, 
        getComments: async (_root: any) => {
            return await commentService.findAll()
        }
    },

    Mutation: {
        createComment: async (_: any, { input }: { input: any }, context: any) => {
            const token = context.user
            if (!token) {
                throw new AuthenticationError("Unauthorized");
              }
            const comment: CommentInput = {userId: token.id, ...input}
            const newComment: CommentDocument | null = await commentService.create(comment);
            return newComment
        },

        updateComment: async (_: any, { input }: { input: any }, context: any) => {
            const token = context.user
            if (!token) {
                throw new AuthenticationError("Unauthorized");
              }
            const { id, content, parentId } = input
            const commentUpdate: CommentInput = {
                userId:token.id,
                content,
                parentId
            }
            const updatedComment: CommentDocument | null = await commentService.update(id, token.id , commentUpdate);
            return updatedComment
        },

        deleteComment: async (_: any, { id }: { id: string }, context: any) => {
            const token = context.user
            if (!token) {
                throw new AuthenticationError("Unauthorized");
            }

            const deletedComment: CommentDocument | null = await commentService.delete(id, token.id);
            return deletedComment
        }
    }
}