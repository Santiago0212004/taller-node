import mongoose from "mongoose";

export interface ReactionInput {
    userId: mongoose.Types.ObjectId, 
    content: string, 
    parentId?: mongoose.Types.ObjectId
}

export interface ReactionDocument extends ReactionInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}

const reactionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}, 
}, {timestamps: true, collection: "reaction"});

const Reaction = mongoose.model<ReactionDocument>("Reaction", reactionSchema);

export default Reaction;