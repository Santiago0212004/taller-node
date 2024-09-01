import { Request, Response } from "express";
import { CommentDocument, CommentInput } from "../models/comment.model";
import commentService from "../services/comment.service";
import CommentDoesNotExistError from "../exceptions/CommentDoesNotExistError";

class CommentController {

    public async create(req: Request, res: Response) {
        try {
            const comment: CommentDocument = await commentService.create(req.body as CommentInput);
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const comment: CommentDocument | null = await commentService.findById(req.params.commentId);
            if (!comment) {
                res.status(404).json({ message: "Comment does not exist" });
                return;
            }
            res.json(comment);
        } catch (error) {
            if (error instanceof CommentDoesNotExistError) {
                res.status(400).json({ message: "Comment does not exist" });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const comments: CommentDocument[] = await commentService.findAll();
            res.json(comments);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const comment: CommentDocument | null = await commentService.update(req.params.commentId, req.body as CommentInput);
            if (!comment) {
                res.status(404).json({ message: "Comment does not exist" });
                return;
            }
            res.json(comment);
        } catch (error) {
            if (error instanceof CommentDoesNotExistError) {
                res.status(400).json({ message: "Comment does not exist" });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const commentId = req.params.commentId;
            const comment: CommentDocument | null = await commentService.delete(commentId);
            if (!comment) {
                res.status(404).json({ message: "Comment does not exist" });
                return;
            }
            res.json(comment);
        } catch (error) {
            if (error instanceof CommentDoesNotExistError) {
                res.status(400).json({ message: "Comment does not exist" });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async reply(req: Request, res: Response) {
        try {
            const parentId = req.params.commentId;
            const comment: CommentDocument = await commentService.create({ ...req.body, parentId } as CommentInput);
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new CommentController();
