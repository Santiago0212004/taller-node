import express from "express";
import userController from '../controllers/user.controller';
import validateSchema from "../middlewares/validateSchema";
import userSchema from "../schemas/user.schema";
import loginSchema from "../schemas/login.schema";
import auth from "../middlewares/auth";

export const router = express.Router();

//Login
router.post("/login", validateSchema(loginSchema), userController.login);

//SuperUser endpoints
router.post("/create", auth(['superuser']), validateSchema(userSchema), userController.create);
router.put("/update/:userId", auth(['superuser']), userController.update);
router.delete("/delete/:userId", auth(['superuser']), userController.delete);

//All users endpoints
router.get("/", auth(['user', 'superuser']), userController.getAll);
router.get("/profile", auth(['user', 'superuser']), userController.get);