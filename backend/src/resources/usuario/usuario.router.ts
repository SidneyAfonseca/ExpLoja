import { Router } from "express";
import usuarioController from "./usuario.controller";
import { createUsuarioSchema } from "./usuario.schema"; "./usuario.schema";
import validate from "../../middlewares/validate";
const router = Router();
// usuario controller
router.get('/', usuarioController.index);
router.post('/', usuarioController.create);
router.get('/:id', usuarioController.read);
router.get('/:email', usuarioController.readEmail);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.remove);
router.post("/", validate(createUsuarioSchema), usuarioController.create);
export default router;
