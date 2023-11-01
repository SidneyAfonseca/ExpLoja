"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = __importDefault(require("./usuario.controller"));
const isAdmin_1 = __importDefault(require("../../middlewares/isAdmin"));
const router = (0, express_1.Router)();
router.get('/', isAdmin_1.default, usuario_controller_1.default.index);
router.post('/', usuario_controller_1.default.create);
router.get('/:id', isAdmin_1.default, usuario_controller_1.default.read);
router.put('/:id', isAdmin_1.default, usuario_controller_1.default.update);
router.delete('/:id', isAdmin_1.default, usuario_controller_1.default.remove);
exports.default = router;
