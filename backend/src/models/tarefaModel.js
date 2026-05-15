import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Lista todos os registros
export async function listar() {
  return prisma.task.findMany();
}

// Busca por ID
export async function buscarPorId(id) {
  return prisma.task.findUnique({ where: { id } });
}

// Cria um novo registro
export async function criar(data) {
  // espera: { title, description?, completed?, categoryId? }
  return prisma.task.create({ data });
}

// Atualiza parcialmente (aceita campos opcionais)
export async function atualizar(id, data) {
  try {
    return await prisma.task.update({ where: { id }, data });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return null;
    }
    throw err;
  }
}

// Exclui por id
export async function excluir(id) {
  try {
    return await prisma.task.delete({ where: { id } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return null;
    }
    throw err;
  }
}
