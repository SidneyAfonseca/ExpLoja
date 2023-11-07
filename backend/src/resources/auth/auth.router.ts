import { Router } from "express";
import authController from "./auth.controller";

const router = Router();

router.get('/', authController.login);

export default router;
