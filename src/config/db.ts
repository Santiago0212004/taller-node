import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_URL || "mongodb://localhost:21017/nodejs";

export const db = mongoose.connect(connectionString)
                        .then(
                            () => console.log("Connected to MongoDB")
                        ).catch(
                            (err) => console.log(err)
                        )
                        