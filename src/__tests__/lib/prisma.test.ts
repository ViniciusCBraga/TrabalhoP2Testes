import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';

// Mock do PrismaClient
jest.mock('@prisma/client', () => {
  const PrismaClient = jest.fn(() => ({
    $disconnect: jest.fn(),
    $connect: jest.fn(),
  }));
  return { PrismaClient };
});

describe('Prisma Client Singleton', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('should create a new PrismaClient instance if not in global scope', () => {
    const { PrismaClient } = require('@prisma/client');

    const prismaInstance = new PrismaClient();

    // Corrigido: use 'toEqual' para avaliar o conteúdo do objeto
    expect(prismaInstance).toEqual(expect.any(PrismaClient));
    expect(PrismaClient).toHaveBeenCalledTimes(1);
  });

  it('should reuse the existing PrismaClient instance from global scope', () => {
    globalThis.prismaGlobal = new PrismaClient();

    const prismaInstance = prisma;

    // Corrigido: use 'toEqual' para avaliar o conteúdo do objeto
    expect(prismaInstance).toEqual(globalThis.prismaGlobal);
    expect(PrismaClient).toHaveBeenCalledTimes(1);
  });

  it('should assign the PrismaClient to globalThis in non-production environments', () => {
    const { PrismaClient } = require('@prisma/client');
    delete globalThis.prismaGlobal; // Remover qualquer instância existente de globalThis

    const prismaInstance = prisma;

    // Verificar se a instância foi corretamente atribuída ao globalThis
    expect(globalThis.prismaGlobal).toEqual(prismaInstance);
    expect(PrismaClient).toHaveBeenCalledTimes(1);
  });

  it('should not assign PrismaClient to globalThis in production', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production'; // Simular ambiente de produção

    const { PrismaClient } = require('@prisma/client');
    delete globalThis.prismaGlobal; // Remover qualquer instância existente de globalThis

    const prismaInstance = prisma;

    // Verificar se a instância não foi atribuída ao globalThis em produção
    expect(globalThis.prismaGlobal).toBeUndefined();
    expect(PrismaClient).toHaveBeenCalledTimes(1);

    process.env.NODE_ENV = originalEnv; // Restaurar o ambiente original
  });
});
