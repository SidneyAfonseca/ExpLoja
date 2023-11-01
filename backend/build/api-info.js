"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.api = {
    name: "API-EMPRESA",
    defaultPort: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3333,
    frontendUrl: (_b = process.env.FRONTEND_URL) !== null && _b !== void 0 ? _b : "http://localhost:3366",
};
