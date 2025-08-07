import { Request, Response } from 'express';

// Mock do Prisma deve ser criado antes do jest.mock
const mockPrismaMapa = {
  pedido: {
    findMany: jest.fn(),
  },
  obstaculo: {
    findMany: jest.fn(),
  },
  drone: {
    findMany: jest.fn(),
  },
};

jest.mock('../src/lib/prisma', () => ({
  prisma: mockPrismaMapa,
}));

import * as mapaController from '../src/controllers/mapaController';

describe('mapaController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('deve gerar o mapa corretamente', async () => {
    mockPrismaMapa.obstaculo.findMany.mockResolvedValue([{ x: 1, y: 1 }]);
    mockPrismaMapa.drone.findMany.mockResolvedValue([{ id: 1, nome: 'Drone A', x: 2, y: 2 }]);
    mockPrismaMapa.pedido.findMany.mockResolvedValue([{ x: 3, y: 3, entregue: false }]);

    await mapaController.gerarMapa(req as Request, res as Response);

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    const mapa = (res.send as jest.Mock).mock.calls[0][0];
    expect(mapa).toContain('█');
    expect(mapa).toContain('D');
    expect(mapa).toContain('P');
  });
});
