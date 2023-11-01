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
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_service_1 = require("./usuario.service");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield (0, usuario_service_1.getAllUsuarios)();
        res.status(200).json(usuarios);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.body;
    try {
        if (yield (0, usuario_service_1.buscaUsuarioPorEmail)(usuario.email))
            return res
                .status(400)
                .json({ msg: "Já existe um usuário com o email informado." });
        const newUsuario = yield (0, usuario_service_1.createUsuario)(usuario);
        res.status(201).json(newUsuario);
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield (0, usuario_service_1.buscaUsuarioPorId)(id);
        if (!usuario)
            return res.status(400).json({ msg: "Usuário não existe." });
        res.status(200).json(usuario);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = req.body;
    try {
        if (!(yield (0, usuario_service_1.buscaUsuarioPorId)(id)))
            return res.status(400).json({ msg: "Usuário não existe." });
        yield (0, usuario_service_1.updateUsuario)(id, usuario);
        res.status(200).json({ msg: "Usuário atualizado com sucesso." });
    }
    catch (e) {
        res.status(500).json(e);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!(yield (0, usuario_service_1.buscaUsuarioPorId)(id)))
            return res.status(400).json({ msg: "Usuário não existe." });
        yield (0, usuario_service_1.deleteUsuario)(id);
        res.status(200).json({ msg: "Usuário deletado com sucesso." });
    }
    catch (e) {
        res.status(500).json(e);
    }
});
exports.default = { index, create, read, update, remove };
