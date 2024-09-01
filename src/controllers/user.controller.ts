import { Request, Response } from "express";
import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";
import UserExistsError from "../exceptions/UserExistsError";
import UserDoesNotExistsError from "../exceptions/UserDoesNotExistsError";

class userController {

    public async create(req: Request, res: Response) {
        try {
            const user: UserDocument = await userService.create(req.body as UserInput);
            res.status(201).json(user);            
        } catch (error) {
            if (error instanceof UserExistsError){
                res.status(400).json({message: "User already exists" });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const resObj = await userService.login(req.body);
            res.status(200).json(resObj);
        } catch (error) {
            if (error instanceof UserDoesNotExistsError){
                res.status(400).json({message: "User does not exists" });
                return;
            } else if (error instanceof ReferenceError){
                res.status(401).json({message: "Not authorized" });
                return;
            } 
            res.status(500).json(error);
        }
    }

    public async get (req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.get(req.params.id); 
            res.json(user);   
        } catch (error) {
            if (error instanceof UserDoesNotExistsError){
                res.status(400).json({message: "User does not exists" });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const users: UserDocument[] = await userService.findAll(); 
            res.json(users);            
        } catch (error) {
            res.status(500).json(error);
        }    
    }

    public async update(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.update(req.params.userId, req.body as UserInput);    
            res.json(user);            
        } catch (error) {
            if (error instanceof UserDoesNotExistsError){
                res.status(400).json({message: "User does not exists" });
                return;
            }
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const user: UserDocument | null = await userService.delete(userId);
            res.json(user);          
        } catch (error) {
            if (error instanceof UserDoesNotExistsError){
                res.status(400).json({message: "User does not exists" });
                return;
            }
            res.status(500).json(error);
        }    
    }
    
}

export default new userController();