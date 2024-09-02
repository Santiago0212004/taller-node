import { ReactionDocument, ReactionInput } from "../models/reaction.model";
import ReactionModel from "../models/reaction.model";
import ReactionDoesNotExistError from "../exceptions/ReactionDoesNotExistError";
import UserModel, {UserDocument, UserInput}  from "../models/user.model";
import UserDoesNotExistsError from "../exceptions/UserDoesNotExistsError";
import NotYourComment from "../exceptions/NotYourComment";



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

    public async delete(id: string, userId: string): Promise<ReactionDocument | null> {
        try {
            const reaction: ReactionDocument | null = await ReactionModel.findById(id);
            const user: UserDocument | null = await UserModel.findById(userId);
            if (!reaction) {
                throw new ReactionDoesNotExistError("Reaction does not exist");
            }
            if (!user) {
                throw new UserDoesNotExistsError("User does not exist");
            }
            if (user.id!=reaction.userId) {
                throw new NotYourComment("Reaction is not yours");
            }
            await ReactionModel.findByIdAndDelete(id);
            return reaction;
        } catch (error) {
            throw error;
        }
    }
}

export default new ReactionService();
