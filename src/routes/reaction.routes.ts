import express from "express";
import reactionController from '../controllers/reaction.controller';
import validateSchema from "../middlewares/validateSchema";
import reactionSchema from "../schemas/reaction.schema";
import auth from "../middlewares/auth";

export const router = express.Router();

// para crear un nuevo comentario
router.post("/create", auth(['user', 'superuser']), validateSchema(reactionSchema), reactionController.create);

// para obtener todos los comentarios
router.get("/", auth(['user', 'superuser']), reactionController.getAll);

// Para obtener, actualizar o eliminar un comentario por ID(solo el autor del comentario o superuser)
router.get("/get/:reactionId", auth(['user', 'superuser']), reactionController.get);
router.delete("/delete/:reactionId", auth(['user', 'superuser']), reactionController.delete);

export default router;