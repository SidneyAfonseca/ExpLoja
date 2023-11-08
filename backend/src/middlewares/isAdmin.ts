import { Request, Response, NextFunction } from "express";
import { TiposUsuarios } from "../resources/tipoUsuario/tipoUsuario.constants";
//import { checkIsAdmin } from '../resources/auth/auth.service';
//function isAdmin(req: Request, res: Response, tipoUsuario: TiposUsuarios) {}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const uid = req.session.uid;
  //  if (uid && (await checkIsAdmin(uid))) next();
  //  else res.status(403).json({ msg: 'Não autorizado' });
};

export default isAdmin;
