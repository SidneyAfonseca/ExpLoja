"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsAdmin = exports.checkAuth = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const tipoUsuario_constants_1 = require("../tipoUsuario/tipoUsuario.constants");
const prisma = new client_1.PrismaClient();
const checkAuth = (credenciais) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = credenciais;
    const usuario = yield prisma.usuario.findUnique({ where: { email } });
    if (!usuario)
        return null;
    const ok = yield bcryptjs_1.default.compare(senha, usuario.senha);
    return ok ? usuario : null;
});
exports.checkAuth = checkAuth;
const checkIsAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield prisma.usuario.findUnique({ where: { id } });
    if (!usuario)
        return false;
    console.log(usuario.tipoUsuarioId, tipoUsuario_constants_1.TiposUsuarios.ADMIN);
    return usuario.tipoUsuarioId === tipoUsuario_constants_1.TiposUsuarios.ADMIN;
});
exports.checkIsAdmin = checkIsAdmin;
