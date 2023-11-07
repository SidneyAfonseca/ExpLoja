import { Usuario, PrismaClient } from "@prisma/client";
import { SignupDto, LoginDto } from "./auth.types";
import { compare, genSalt, hash } from "bcryptjs";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import { readUsuarioByEmail } from "../usuario/usuario.service";

const prisma = new PrismaClient();

export async function createUsuario(Usuario: SignupDto
): Promise<Usuario> {
    const rounds = parseInt(process.env.SALT_ROUNDS!);
    const salt = await genSalt(rounds);
    const senha = await hash(Usuario.senha, salt);
    return await prisma.usuario.create({
        data: {
            ...
            Usuario,
            senha,
            tipoUsuarioId: TiposUsuarios.CLIENT,
        },
    });
}

export async function autenticate(usuario: LoginDto): Promise<Usuario | null> {
    const foundUsuario = await readUsuarioByEmail(usuario.email);
    if (!foundUsuario) return null;
    const ok = await compare(usuario.senha, foundUsuario.senha);
    if (!ok) return null;
    return foundUsuario;
}    