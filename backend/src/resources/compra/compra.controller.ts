import { Request, Response } from "express";
import { salvaCompra } from "./compra.service";

function addItemCarrinho(req: Request, res: Response) {
    /*
    #swagger.summary = 'Adiciona produto no carrinho.'
    #swagger.parameters['id'] = { description: 'ID do produto desejado' }
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/AddProdutoCarrinhoMsg' }
    }    
    */
    const id = req.params.id;
    const quantidade = parseInt(req.params.quantidade);

    if (!req.session.carrinhoCompra) req.session.carrinhoCompra = [];
    req.session.carrinhoCompra.push({ id, quantidade });

    res.status(200).json({ msg: "Item adicionado ao carrinho" });
}

async function efetivaCompra(req: Request, res: Response) {
    /*
    #swagger.summary = 'Finaliza a compra.'
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/FinalizaCompraMsg' }
    }    
    */
    if (!req.session.carrinhoCompra)
        return res.status(400).json({ msg: "Carrinho vazio" });
    if (!req.session.uid)
        return res.status(400).json({ msg: "Usuário não logado" });
    try {
        await salvaCompra(req.session.carrinhoCompra, req.session.uid);
        req.session.carrinhoCompra = [];
        res.status(200).json({ msg: "Compra feita com sucesso" });
    } catch (error) {
        res.status(500).json(error);
    }
}

function getCarrinho(req: Request, res: Response) {
    /*
    #swagger.summary = 'Recupera lista de produtos do carrinho.'
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/ProdutosCarrinhoList' }
    }    
    */
    if (!req.session.carrinhoCompra)
        return res.status(400).json({ msg: "Carrinho vazio" });
    if (!req.session.uid)
        return res.status(400).json({ msg: "Usuário não logado" });
    res.status(200).json(req.session.carrinhoCompra);
}

export default { addItemCarrinho, efetivaCompra, getCarrinho };
