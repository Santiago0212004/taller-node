import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const auth = (requiredRoles: string[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let token = req.header("Authorization");
        token = token?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
            req.body.loggedUser = decoded;

            if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Insufficient role permissions" });
            }

            req.params.id = decoded.id;
            next();
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return res.status(401).json({ message: "Token expired" });
            }
            res.status(401).json({ message: "Unauthorized" });
        }
    };
};

export default auth;
