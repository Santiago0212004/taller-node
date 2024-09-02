import { CommentDocument, CommentInput } from "../models/comment.model";
import UserModel, {UserDocument, UserInput}  from "../models/user.model";
import CommentModel from "../models/comment.model";
import CommentDoesNotExistError from "../exceptions/CommentDoesNotExistError";
import UserDoesNotExistsError from "../exceptions/UserDoesNotExistsError";
import NotYourComment from "../exceptions/NotYourComment";

class CommentService {

    public async create(commentInput: CommentInput): Promise<CommentDocument> {
        try {
            const comment = await CommentModel.create(commentInput);
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async get(id: string): Promise<CommentDocument | null> {
        try {
            const comment = await CommentModel.findById(id);
            if (!comment) {
                throw new CommentDoesNotExistError("Comment does not exist");
            }
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<CommentDocument[]> {
        try {
            const comments = await CommentModel.find();
            return comments;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: string, userId: String, commentInput: CommentInput): Promise<CommentDocument | null> {
        try {
            const comment: CommentDocument | null = await CommentModel.findById(id);
            const user: UserDocument | null = await UserModel.findById(userId);
            if (!comment) {
                throw new CommentDoesNotExistError("Comment does not exist");
            }
            if (!user) {
                throw new UserDoesNotExistsError("User does not exist");
            }
            if (user.id!=comment.userId && user.role!="superuser") {
                throw new NotYourComment("Comment is not yours");
            }
            await CommentModel.findOneAndUpdate({ _id: id }, commentInput, { returnOriginal: false });
            return comment;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string, userId: String): Promise<CommentDocument | null> {
        try {
            const comment: CommentDocument | null = await CommentModel.findById(id);
            const user: UserDocument | null = await UserModel.findById(userId);
            if (!comment) {
                throw new CommentDoesNotExistError("Comment does not exist");
            }
            if (!user) {
                throw new UserDoesNotExistsError("User does not exist");
            }
            if (user.id!=comment.userId && user.role!="superuser") {
                throw new NotYourComment("Comment is not yours");
            }
            await CommentModel.findByIdAndDelete(id);
            return comment;
        } catch (error) {
            throw error;
        }
    }
}

export default new CommentService();
