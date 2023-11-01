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
const produto_service_1 = require("./produto.service");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const produtos = yield (0, produto_service_1.getAllProdutos)();
        res.status(200).json(produtos);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const produto = req.body;
    try {
        if (yield (0, produto_service_1.buscaProdutoPorNome)(produto.nome))
            return res.status(400).json({ message: "Produto já existe" });
        const newProduto = yield (0, produto_service_1.createProduto)(produto);
        res.status(201).json(newProduto);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const prod = yield (0, produto_service_1.getProduto)(id);
        if (!prod)
            return res.status(400).json({ message: "Produto não existe" });
        res.status(200).json(prod);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const produto = req.body;
    try {
        const prod = yield (0, produto_service_1.getProduto)(id);
        if (!prod)
            return res.status(400).json({ message: "Produto não existe" });
        yield (0, produto_service_1.updateProduto)(id, produto);
        res.status(200).json({ message: "Produto atualizado" });
    }
    catch (e) {
        res.status(500).json(e);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const prod = yield (0, produto_service_1.getProduto)(id);
        console.log(prod);
        if (!prod)
            return res.status(400).json({ message: "Produto não existe" });
        yield (0, produto_service_1.deleteProduto)(id);
        res.status(200).json({ message: "Produto apagado" });
    }
    catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});
exports.default = { index, create, read, update, remove };
