"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefs = {
    openapi: "3.1.0",
    info: {
        title: "Documentação da API da Loja Virtual",
        version: "0.1.0",
    },
    servers: [
        {
            url: "http://localhost:3333/v1",
        },
    ],
};
exports.default = (0, swagger_jsdoc_1.default)({
    definition: swaggerDefs,
    apis: ["src/resources/**/*.yaml"],
});
