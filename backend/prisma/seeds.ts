import { PrismaClient } from "@prisma/client";
import { TiposUsuarios } from "../src/resources/tipoUsuario/tipoUsuario.constants";

const prisma = new PrismaClient();

async function tipoUsuarioSeeds() {
    await prisma.tipoUsuario.createMany({
        data: [
            { id: TiposUsuarios.CLIENT, rotulo: "cliente" },
            { id: TiposUsuarios.ADMIN, rotulo: "admin" },
        ],
        skipDuplicates: true,
    });
}

tipoUsuarioSeeds().then(async () => {
    await prisma.$disconnect()
})
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()

    })