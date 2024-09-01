import { boolean, object, string } from 'zod';

const userSchema = object({
    name: string({ required_error: "Name is required" }),
    email: string({ required_error: "Email is required" })
        .email("Not a valid email address"),
    password: string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters long"),
    role: string({ required_error: "Role is required" })
        .refine((value) => value === 'user' || value === 'superuser', {
            message: "Role must be either 'user' or 'superuser'"
        }),
    isActive: boolean({ required_error: "isActive is required" }),
});

export default userSchema;
