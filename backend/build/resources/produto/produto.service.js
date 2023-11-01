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
exports.deleteProduto = exports.existeProdutocomId = exports.buscaProdutoPorNome = exports.updateProduto = exports.getProduto = exports.createProduto = exports.getAllProdutos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllProdutos = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.produto.findMany();
});
exports.getAllProdutos = getAllProdutos;
const createProduto = (produto) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.produto.create({ data: produto });
});
exports.createProduto = createProduto;
const getProduto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.produto.findUnique({ where: { id } });
});
exports.getProduto = getProduto;
const updateProduto = (id, produto) => __awaiter(void 0, void 0, void 0, function* () {
    const produtoUpdated = yield prisma.produto.update({
        where: { id },
        data: produto,
    });
    return produtoUpdated;
});
exports.updateProduto = updateProduto;
const buscaProdutoPorNome = (nome) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.produto.findUnique({ where: { nome } });
});
exports.buscaProdutoPorNome = buscaProdutoPorNome;
const existeProdutocomId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return !!(yield prisma.produto.findUnique({ where: { id } }));
});
exports.existeProdutocomId = existeProdutocomId;
const deleteProduto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.produto.delete({ where: { id } });
});
exports.deleteProduto = deleteProduto;
