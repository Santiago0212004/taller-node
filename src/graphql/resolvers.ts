import { CommentInput, CommentDocument } from "../models/comment.model"
import  commentService  from "../services/comment.service"

export const resolvers = {
    Query: {
        getComment: async (_root: any, params: any) => {
            const comment: CommentDocument | null = await commentService.get(params.id);
            return comment;
        }, 
        getComments: (_root: any) => commentService.findAll()
    },

    Mutation: {
        createComment: async (_root: any, params: any) => {
            const newComment: CommentDocument | null = await commentService.create(params.input as CommentInput);
            return newComment
        },

        updateComment: async (_root: any, params: any) => {
            const { id, userId, content, parentId } = params
            const commentUpdate: CommentInput = {
                userId,
                content,
                parentId
            }
            const updatedComment: CommentDocument | null = await commentService.update(id, userId, commentUpdate);
            return updatedComment
        },

        deleteComment: async (_root: any, params: any) => {
            const deletedComment: CommentDocument | null = await commentService.delete(params.id, params.userId);
            return deletedComment
        }
    }
}
