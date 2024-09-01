import mongoose from "mongoose";

export interface CommentInput {
    userId: mongoose.Types.ObjectId, 
    content: string, 
    parentId?: mongoose.Types.ObjectId
}

export interface CommentDocument extends CommentInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date
}

const commentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}, 
}, {timestamps: true, collection: "comments"});

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;