import express from "express";
import commentController from '../controllers/comment.controller';
import validateSchema from "../middlewares/validateSchema";
import commentSchema from "../schemas/comment.schema";
import auth from "../middlewares/auth";

export const router = express.Router();

// para crear un nuevo comentario
router.post("/create", auth(['user', 'superuser']), validateSchema(commentSchema), commentController.create);

// para obtener todos los comentarios
router.get("/", auth(['user', 'superuser']), commentController.getAll);

// Para obtener, actualizar o eliminar un comentario por ID(solo el autor del comentario o superuser)
router.get("/get/:commentId", auth(['user', 'superuser']), commentController.get);
router.put("/update/:commentId", auth(['user', 'superuser']), commentController.update);
router.delete("/delete/:commentId", auth(['user', 'superuser']), commentController.delete);

// Responder a un comentario
router.post("/:commentId/reply", auth(['user', 'superuser']), validateSchema(commentSchema), commentController.reply);


export default router;
