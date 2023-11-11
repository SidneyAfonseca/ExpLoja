import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();
const doc = {
  info: {
    title: "API da Loja virtual",
    description: "Documentação da API",
  },
  host: `${process.env.HOST}:${process.env.PORT}`,
  definitions: {
    CreateProdutoDto: {
      $nome: "Celular Samsung",
      preco: 1299.0,
      estoque: 1,
    },
    LoginDto: {
      email: "@.com.br",
      senha: "1234567",
    },
    Produto: {
      id: "eqdwe-",
      nome: "Teste",
      preco: 1299.0,
      estoque: 1,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    },
    AddProdutoCarrinhoMsg: {
      msg: "Item adicionado ao carrinho",
    },
    FinalizaCompraMsg: {
      msg: "Compra feita com sucesso",
    },
    ProdutosCarrinhoList: [
      {
        id: "06193fb5-b17b-428b-8bbe-563709e2c9f1",
        quantidade: 10,
      },
    ],
  },
};
const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];
swaggerAutogen()(outputFile, routes, doc);
