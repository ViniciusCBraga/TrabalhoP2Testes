import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Extensão do tipo globalThis para incluir 'prismaGlobal'
declare global {
  // Extende o tipo global para incluir prismaGlobal
  var prismaGlobal: PrismaClient | undefined;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Verificação de ambiente
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
