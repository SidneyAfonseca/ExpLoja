"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLogged = (req, res, next) => {
    if (req.session.uid)
        next();
    else
        res.status(401).json({ msg: 'Não logado' });
};
exports.default = isLogged;
