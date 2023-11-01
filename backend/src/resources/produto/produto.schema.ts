import Joi, { Schema } from "joi";

export const schemaProduto: Schema = Joi.object().keys({
  nome: Joi.string().min(3).max(50).required(),
  preco: Joi.number().required(),
  estoque: Joi.number().integer().required(),
});
// const celularMoto = {
//   nome: "Smartphone Motorola Edge 30",
//   preco: 1499,
//   estoque: 3,
// };
//const result = schemaProduto.validate(celularMoto);
//console.log(result);
