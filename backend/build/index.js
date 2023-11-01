"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_info_1 = require("./api-info");
const server_1 = require("./server");
dotenv_1.default.config();
(0, validateEnv_1.default)();
const server = new server_1.Api();
try {
    server.bootstrap().then(() => {
        console.info(`API Empresa rodando na porta ${api_info_1.api.defaultPort}`);
    });
}
catch (error) {
    console.error("Server failed to start.");
    console.error(error);
    process.exit(1);
}
