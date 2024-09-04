import { boolean, object, string, optional, union } from 'zod';
import { ObjectId } from 'mongodb'; 

const commentSchema = object({
    content: string({ required_error: "Content is required" })
        .min(1, "Content must not be empty"),
    parentId: union([string().refine((value) => ObjectId.isValid(value), {
        message: "Parent ID must be a valid ObjectId if provided"
    }), optional(string())]).nullable()
});

export default commentSchema;
