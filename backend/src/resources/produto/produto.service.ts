import { PrismaClient, Produto } from "@prisma/client";
import { CreateProdutoDto, UpdateProdutoDto } from "./produto.types";
const prisma = new PrismaClient();

export const getAllProdutos = async (): Promise<Produto[]> => {
  return await prisma.produto.findMany();
};

export const createProduto = async (
  produto: CreateProdutoDto
): Promise<Produto> => {
  return await prisma.produto.create({ data: produto });
};

export const getProduto = async (id: string): Promise<Produto | null> => {
  return prisma.produto.findUnique({ where: { id } });
};

export const updateProduto = async (
  id: string,
  produto: UpdateProdutoDto
): Promise<Produto> => {
  const produtoUpdated = await prisma.produto.update({
    where: { id },
    data: produto,
  });
  return produtoUpdated;
};

export const buscaProdutoPorNome = async (
  nome: string
): Promise<Produto | null> => {
  return await prisma.produto.findUnique({ where: { nome } });
};

export const existeProdutocomId = async (id: string): Promise<boolean> => {
  return !!(await prisma.produto.findUnique({ where: { id } }));
};

export const deleteProduto = async (id: string): Promise<Produto> => {
  return await prisma.produto.delete({ where: { id } });
};
