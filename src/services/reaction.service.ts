import { ReactionDocument, ReactionInput } from "../models/reaction.model";
import ReactionModel from "../models/reaction.model";
import ReactionDoesNotExistError from "../exceptions/ReactionDoesNotExistError";

class ReactionService {

    public async create(reactionInput: ReactionInput): Promise<ReactionDocument> {
        try {
            const reaction = await ReactionModel.create(reactionInput);
            return reaction;
        } catch (error) {
            throw error;
        }
    }

    public async get(id: string): Promise<ReactionDocument | null> {
        try {
            const reaction = await ReactionModel.findById(id);
            if (!reaction) {
                throw new ReactionDoesNotExistError("Reaction does not exist");
            }
            return reaction;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<ReactionDocument[]> {
        try {
            const reactions = await ReactionModel.find();
            return reactions;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<ReactionDocument | null> {
        try {
            const comment: ReactionDocument | null = await ReactionModel.findById(id);
            if (!comment) {
                throw new ReactionDoesNotExistError("Reaction does not exist");
            }
            await ReactionModel.findByIdAndDelete(id);
            return comment;
        } catch (error) {
            throw error;
        }
    }
}

export default new ReactionService();
