import { Router } from "express";
import languageController from "./linguagem.controller";
import { linguagem } from "./linguagem.schema";
import validate from "../../middlewares/validate";

const router = Router();
router.post("/change", validate(linguagem), languageController.changeLanguage);
export default router;
