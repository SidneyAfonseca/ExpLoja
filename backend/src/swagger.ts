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
  },
};
const outputFile = "./swagger-output.json";
const routes = ["./src/router/index.ts"];
swaggerAutogen()(outputFile, routes, doc);
