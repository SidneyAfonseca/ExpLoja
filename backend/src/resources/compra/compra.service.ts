import { PrismaClient } from "@prisma/client";
import { ProdutoCarrinho } from "./compra.types";

const prisma = new PrismaClient();

export async function salvaCompra(
    produtosCarrinho: ProdutoCarrinho[],
    uid: string
) {
    const novaCompra = await prisma.compra.create({
        data: {
            usuarioid: uid,
        },
    });
    produtosCarrinho.forEach(
        async (produtoCarrinho) => await salvaItem(produtoCarrinho, novaCompra.id)
    );
}

async function salvaItem(produtoCarrinho: ProdutoCarrinho, compraid: string) {
    await prisma.compraProduto.create({
        data: {
            compraid,
            produtoId: produtoCarrinho.id,
            quantidade: produtoCarrinho.quantidade,
        },
    });
}
