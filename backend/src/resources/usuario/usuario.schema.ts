import Joi, { Schema } from "joi";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";

export const createUsuarioSchema: Schema = Joi.object().keys({
    nome: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
    tipoUsuarioId: Joi.string().valid(TiposUsuarios).required(),
});
