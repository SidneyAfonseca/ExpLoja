import { Router } from "express";
import { schemaProduto } from "./produto.schema";
import produtoController from "./produto.controller";
import validate from "../../middlewares/validate";
const router = Router();

router.get("/", produtoController.index);
router.post("/", validate(schemaProduto), produtoController.create);
router.get("/:id", produtoController.read);
router.put("/:id", produtoController.update);
router.delete("/:id", produtoController.remove);

export default router;
