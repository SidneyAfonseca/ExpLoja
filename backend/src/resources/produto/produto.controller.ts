import { Request, Response } from "express";
import {
  getAllProdutos,
  buscaProdutoPorNome,
  createProduto,
  getProduto,
  updateProduto,
  deleteProduto,
} from "./produto.service";
import { CreateProdutoDto } from "./produto.types";

const index = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Retorna Todos os Produtos.'
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/Produto' }
 }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Produto' }
 }
 */
  try {
    const produtos = await getAllProdutos();
    res.status(200).json(produtos);
  } catch (e) {
    res.status(500).json(e);
  }
};

const create = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Adiciona um novo produto na base.'
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/CreateProdutoDto' }
 }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Produto' }
 }
 */
  const produto = req.body as CreateProdutoDto;
  try {
    if (await buscaProdutoPorNome(produto.nome))
      return res.status(400).json({ message: "Produto já existe" });
    const newProduto = await createProduto(produto);
    res.status(201).json(newProduto);
  } catch (e) {
    res.status(500).json(e);
  }
};

const read = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'retorna um  produto da base.'
 #swagger.parameters['id'] = { description ="ID Produto" }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Produto' }
 }
 */
  const { id } = req.params;
  try {
    const prod = await getProduto(id);
    if (!prod) return res.status(400).json({ message: "Produto não existe" });
    res.status(200).json(prod);
  } catch (e) {
    res.status(500).json(e);
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const produto = req.body;
  try {
    const prod = await getProduto(id);
    if (!prod) return res.status(400).json({ message: "Produto não existe" });
    await updateProduto(id, produto);
    res.status(200).json({ message: "Produto atualizado" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const prod = await getProduto(id);
    console.log(prod);
    if (!prod) return res.status(400).json({ message: "Produto não existe" });
    await deleteProduto(id);
    res.status(200).json({ message: "Produto apagado" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export default { index, create, read, update, remove };
