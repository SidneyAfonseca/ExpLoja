import { Router } from "express";

import produtoRouter from "../resources/produto/produto.router";
import languageRouter from "../resources/linguagem/linguagem.router";
const router = Router();

router.use("/produto", produtoRouter);
router.use("/change", languageRouter);
export default router;
