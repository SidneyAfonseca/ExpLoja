import { PrismaClient, Usuario } from "@prisma/client";
import { CreateUsuarioDto, UpdateUsuarioDto } from "./usuario.types";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import { genSalt, hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function getUsuarios(tipoUsuario: TiposUsuarios): Promise<Usuario[]> {
    return await prisma.usuario.findMany({ where: { tipoUsuarioId: tipoUsuario } });
}

export async function getAllUsuarios(): Promise<Usuario[]> {
    return await prisma.usuario.findMany();
}
export async function createUsuario(Usuario: CreateUsuarioDto
): Promise<Usuario> {
    const rounds = parseInt(process.env.SALT_ROUNDS!);
    const salt = await genSalt(rounds);
    const senha = await hash(Usuario.senha, salt);
    return await prisma.usuario.create({
        data: {
            ...
            Usuario,
            senha
        }
    });
}

export async function jaExiste(email: string): Promise<boolean> {
    return !!(await prisma.usuario.findUnique({ where: { email } }))
}

export async function readUsuarioByEmail(email: string): Promise<Usuario | null> {
    return await prisma.usuario.findUnique({ where: { email } });
}

export async function readUsuario(id: string): Promise<Usuario | null> {
    return await prisma.usuario.findUnique({ where: { id } });
}

export async function updateUsuario(id: string,
    Usuario: UpdateUsuarioDto)
    : Promise<Usuario> {
    return await prisma.usuario.update({ data: Usuario, where: { id: id } });
}

export async function deleteUsuario(id: string): Promise<void> {
    await prisma.usuario.delete({ where: { id: id } });
}