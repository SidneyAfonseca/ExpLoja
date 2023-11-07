import { Usuario } from "@prisma/client";


export type SignupDto = Pick<Usuario, 'nome' | 'email' | 'senha'>

export type LoginDto = Pick<Usuario, 'email' | 'senha'>