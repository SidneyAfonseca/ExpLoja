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
exports.deleteUsuario = exports.buscaUsuarioPorId = exports.buscaUsuarioPorEmail = exports.updateUsuario = exports.createUsuario = exports.getAllUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.usuario.findMany({
        select: {
            id: true,
            tipoUsuarioId: true,
            nome: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
});
exports.getAllUsuarios = getAllUsuarios;
const createUsuario = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const rounds = parseInt(process.env.SALT_ROUNDS);
    const salt = yield bcryptjs_1.default.genSalt(rounds);
    const hash = yield bcryptjs_1.default.hash(usuario.senha, salt);
    const newUsuario = yield prisma.usuario.create({
        data: Object.assign(Object.assign({}, usuario), { senha: hash }),
    });
    return newUsuario;
});
exports.createUsuario = createUsuario;
const updateUsuario = (id, usuario) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.usuario.update({
        data: usuario,
        where: { id },
    });
});
exports.updateUsuario = updateUsuario;
const buscaUsuarioPorEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.usuario.findUnique({
        select: {
            id: true,
            tipoUsuarioId: true,
            nome: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
        where: { email },
    });
});
exports.buscaUsuarioPorEmail = buscaUsuarioPorEmail;
const buscaUsuarioPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.usuario.findUnique({
        select: {
            id: true,
            tipoUsuarioId: true,
            nome: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
        where: { id },
    });
});
exports.buscaUsuarioPorId = buscaUsuarioPorId;
const deleteUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.usuario.delete({ where: { id } });
});
exports.deleteUsuario = deleteUsuario;
