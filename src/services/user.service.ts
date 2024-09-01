import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel, {UserDocument, UserInput}  from "../models/user.model";
import UserExistsError from "../exceptions/UserExistsError";
import UserDoesNotExistsError from "../exceptions/UserDoesNotExistsError";

class UserService {
    public async create(userInput: UserInput): Promise<UserDocument> {
        try {
            const userExists: UserDocument | null = await this.findByEmail(userInput.email);
            if(userExists)
                throw new UserExistsError("User already exists");

            userInput.password = await bcrypt.hash(userInput.password, 10);
            const  user = await  UserModel.create(userInput);
            return user;
        } catch (error) {
           throw error; 
        }
    }

    public async login(userInput: UserInput) {
        try {
            const userExists: UserDocument | null = await this.findByEmail(userInput.email);

            if(!userExists)
                throw new UserDoesNotExistsError("User does not exists"); 

            const isMatch: boolean = await bcrypt.compare(userInput.password, userExists.password);
        
            if(!isMatch)
                throw  new ReferenceError("Not authorized");
            
            return { 
                email: userExists.email, 
                id: userExists._id , 
                token: this.generateToken(userExists)
            };

        } catch (error) {
           throw error; 
        }
    }


    public async findByEmail(email: string): Promise<UserDocument | null > {
        try {
            const user: UserDocument | null = await UserModel.findOne({email});
            return user;
        } catch (error) {
           throw error; 
        }
    }

    public async findAll(): Promise<UserDocument[] > {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
           throw error; 
        }
    }    

    public async findById(id: string): Promise<UserDocument | null > {
        try {
            const user = await  UserModel.findById(id);
            return user;
        } catch (error) {
           throw error; 
        }
    }

    public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await this.findById(id);
            if(!user)
                throw new UserDoesNotExistsError("User does not exists");
            await UserModel.findOneAndUpdate({_id: id}, userInput, {returnOriginal: false});
            return user;      
        } catch (error) {
           throw error; 
        }
    }

    public async delete(id: string): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await this.findById(id);
            if(!user)
                throw new UserDoesNotExistsError("User does not exists"); 
            await UserModel.findByIdAndDelete(id);
            return user;            
        } catch (error) {
           throw error; 
        }
    }

    public generateToken(user: UserDocument): string {
        try{
            return jwt.sign({id: user._id, email: user.email, name:user.name, role: user.role}, process.env.JWT_SECRET || "secret", {expiresIn: "2m"});
        }catch(error) {
            throw error;
        }
    }
}

export default new UserService();