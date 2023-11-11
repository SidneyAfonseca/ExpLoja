import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

import validateEnv from "./utils/validateEnv";
import router from "./router";
import cookieParser from "cookie-parser";
import setLangCookie from "./middlewares/setLangCookie";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import { ProdutoCarrinho } from "./resources/compra/compra.types";

declare module "express-session" {
  interface SessionData {
    uid: string;
    tipoUsuario: string;
    carrinhoCompra: ProdutoCarrinho[];
  }
}

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT ?? 7777;

app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    genid: () => uuidv4(),
    secret: "sdafuvxz#@",
    resave: true,
    cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
  })
);
app.use(setLangCookie);
app.use(router);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
