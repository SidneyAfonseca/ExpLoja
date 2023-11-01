"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tipoUsuario_service_1 = require("./tipoUsuario.service");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipos = yield (0, tipoUsuario_service_1.getTiposUsuarios)();
        res.status(200).json(tipos);
    }
    catch (e) {
        res.status(500).json(e);
    }
});
exports.default = { index };
