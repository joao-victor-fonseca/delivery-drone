export const prisma = {
  pedido: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  obstaculo: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
  },
  drone: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  entrega: {
    create: jest.fn(),
    update: jest.fn(),
  },
};
