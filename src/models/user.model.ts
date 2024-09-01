import mongoose from "mongoose";

export interface UserInput {
    name: string, 
    email: string, 
    password: string,
    role: String,
    isActive: Boolean
}

export interface UserDocument extends  UserInput, mongoose.Document {
    createdAt: Date, 
    updateAt: Date,
    deleteAt: Date
}

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    isActive: {type: Boolean, required: true},
}, {timestamps: true, collection: "users"});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;