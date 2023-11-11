import { Router } from "express";
import compraController from "./compra.controller";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.get("/", isAuth, compraController.getCarrinho);
router.post("/:id/:quantidade", isAuth, compraController.addItemCarrinho);
router.post("/", isAuth, compraController.efetivaCompra);

export default router;
