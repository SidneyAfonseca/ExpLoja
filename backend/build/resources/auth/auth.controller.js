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
const tipoUsuario_constants_1 = require("./../tipoUsuario/tipoUsuario.constants");
const auth_service_1 = require("./auth.service");
const usuario_service_1 = require("../usuario/usuario.service");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    try {
        const usuario = yield (0, auth_service_1.checkAuth)({ email, senha });
        if (!usuario)
            return res.status(401).json({ msg: 'Email e/ou senha incorretos' });
        req.session.uid = usuario.id;
        res.status(200).json({ msg: 'Usuário autenticado com sucesso' });
    }
    catch (e) {
        res.status(500).json(e);
    }
});
const logout = (req, res) => {
    if (req.session.uid) {
        req.session.destroy((err) => {
            if (err)
                return res.status(500).json(err);
            res.status(200).json({ msg: 'Usuario deslogado com sucesso.' });
        });
    }
    else {
        res.status(401).json({ msg: 'O usuário não estava logado.' });
    }
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.body;
    try {
        if (yield (0, usuario_service_1.buscaUsuarioPorEmail)(usuario.email))
            return res
                .status(400)
                .json({ msg: 'Já existe usuário com o email informado.' });
        const newUsuario = yield (0, usuario_service_1.createUsuario)(Object.assign(Object.assign({}, usuario), { tipoUsuarioId: tipoUsuario_constants_1.TiposUsuarios.CLIENT }));
        res.status(201).json(newUsuario);
    }
    catch (e) {
        res.status(500).json(e.errors);
    }
});
exports.default = { login, logout, signup };
