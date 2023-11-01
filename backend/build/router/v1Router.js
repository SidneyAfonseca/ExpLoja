"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../resources/auth/auth.router"));
const produto_router_1 = __importDefault(require("../resources/produto/produto.router"));
const usuario_router_1 = __importDefault(require("../resources/usuario/usuario.router"));
const tipoUsuario_router_1 = __importDefault(require("../resources/tipoUsuario/tipoUsuario.router"));
const router = (0, express_1.Router)();
router.use("/", auth_router_1.default);
router.use("/produto", produto_router_1.default);
router.use("/usuario", usuario_router_1.default);
router.use("/tipo-usuario", tipoUsuario_router_1.default);
exports.default = router;
