import { Request, Response } from "express";
import { jaExiste } from "../usuario/usuario.service";
import { createUsuario, autenticate } from "../auth/auth.services";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";
async function signup(req: Request, res: Response) {
  try {
    if (await jaExiste(req.body.email))
      return res
        .status(409)
        .json({ msg: "já existe usuario com  email informado" });
    const usuario = await createUsuario(req.body);
    tipoUsuarioId: TiposUsuarios.CLIENT, res.status(201).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function login(req: Request, res: Response) {
   /*
 #swagger.summary = 'Faz Login de usuario.'
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/LoginDto' }
 }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Auth' }
 }
 */
  try {
    const { email, senha } = req.body;

    const usuario = await autenticate(req.body);

    if (!usuario) res.status(401).json({ msg: "Email e/ou senha incorretos" });

    // req.session.uid = usuario.id;
    // req.session.tipoUsuarioId = usuario.tipoUsuarioId;
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

function logout(req: Request, res: Response) {
  const { lang } = req.body;
  res.cookie("lang", lang);
  res.json({ lang });
}
export default { login, logout, signup };
