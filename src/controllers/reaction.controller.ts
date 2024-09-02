import { Request, Response } from "express";
import { ReactionDocument, ReactionInput } from "../models/reaction.model";
import reactionService from "../services/reaction.service";
import ReactionDoesNotExistError from "../exceptions/ReactionDoesNotExistError";
import { actualUser } from "../services/user.service";
import NotYourComment from "../exceptions/NotYourComment";
class ReactionController {

    public async create(req: Request, res: Response) {
        try {
            req.body.userId = req.params.id;
            const reaction: ReactionDocument = await reactionService.create(req.body as ReactionInput);
            res.status(201).json(reaction);
        } catch (error) {
            throw error;
            res.status(500).json(error);
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const reaction: ReactionDocument | null = await reactionService.get(req.params.reactionId);
            res.json(reaction);
        } catch (error) {
            if (error instanceof ReactionDoesNotExistError) {
                res.status(400).json({ message: "Reaction does not exist" });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const reactions: ReactionDocument[] = await reactionService.findAll();
            res.json(reactions);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const reactionId = req.params.reactionId;
            const reaction: ReactionDocument | null = await reactionService.delete(reactionId,req.params.id);
            if (!reaction) {
                res.status(404).json({ message: "Reaction does not exist" });
                return;
            }
            res.json(reaction);
        } catch (error) {
            if (error instanceof ReactionDoesNotExistError) {
                res.status(400).json({ message: "Reaction does not exist" });
                return;
            }
            if (error instanceof NotYourComment) {
                res.status(400).json({ message: "Reaction is not yours" });
                return;
            }
            res.status(500).json(error);
        }
    }

}

export default new ReactionController();