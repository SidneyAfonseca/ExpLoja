import Joi, { Schema } from "joi";

export const linguagem: Schema = Joi.object().keys({
  lang: Joi.string().valid("pt-BR", "en-US").required(),
});
