import { Request, Response } from 'express';
import * as alocacaoService from '../src/services/alocacaoService';

// Defina o mock do Prisma ANTES do jest.mock
const mockPrisma = {
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

// Mock de prisma importado no controller
jest.mock('../src/lib/prisma', () => ({
  prisma: mockPrisma,
}));

// Mock de alocacaoService
jest.mock('../src/services/alocacaoService', () => ({
  alocarPedido: jest.fn(),
}));

import * as pedidoController from '../src/controllers/pedidoController';

describe('pedidoController', () => {
  let req: Partial<Request>;
  let res: jest.Mocked<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn(),
      send: jest.fn(),
    } as any;

    jest.clearAllMocks();
  });

  describe('criarPedido', () => {
    it('deve retornar 400 se faltar campo obrigatório', async () => {
      req.body = { x: 1, y: 2, peso: 3 };

      await pedidoController.criarPedido(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ erro: expect.any(String) }));
    });

    it('deve criar pedido e alocar com sucesso', async () => {
      req.body = { x: 1, y: 2, peso: 3, prioridade: 1 };

      mockPrisma.pedido.create.mockResolvedValue({ id: 123, ...req.body });
      (alocacaoService.alocarPedido as jest.Mock).mockResolvedValue(undefined);

      await pedidoController.criarPedido(req as Request, res);

      expect(mockPrisma.pedido.create).toHaveBeenCalledWith({ data: req.body });
      expect(alocacaoService.alocarPedido).toHaveBeenCalledWith(123);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          mensagem: 'Pedido criado com sucesso',
          pedido: expect.objectContaining({ id: 123 }),
        })
      );
    });

    it('deve retornar 400 se alocacao falhar', async () => {
      req.body = { x: 1, y: 2, peso: 3, prioridade: 1 };

      mockPrisma.pedido.create.mockResolvedValue({ id: 123, ...req.body });
      (alocacaoService.alocarPedido as jest.Mock).mockRejectedValue(new Error('Falha'));

      await pedidoController.criarPedido(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ erro: 'Falha' }));
    });
  });

  describe('statusPedido', () => {
    it('deve retornar 404 se pedido não encontrado', async () => {
      req.params = { id: '1' };
      mockPrisma.pedido.findUnique.mockResolvedValue(null);

      await pedidoController.statusPedido(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ erro: 'Pedido não encontrado' });
    });

    it('deve retornar AGUARDANDO se não houver entrega', async () => {
      req.params = { id: '1' };
      mockPrisma.pedido.findUnique.mockResolvedValue({ id: 1, entrega: null });

      await pedidoController.statusPedido(req as Request, res);

      expect(res.json).toHaveBeenCalledWith({ status: 'AGUARDANDO' });
    });

    it('deve retornar status do drone', async () => {
      req.params = { id: '1' };
      mockPrisma.pedido.findUnique.mockResolvedValue({
        id: 1,
        entrega: { drone: { status: 'EM_VOO' } },
      });

      await pedidoController.statusPedido(req as Request, res);

      expect(res.json).toHaveBeenCalledWith({ status: 'EM_VOO' });
    });

    it('deve retornar 500 em erro inesperado', async () => {
      req.params = { id: '1' };
      mockPrisma.pedido.findUnique.mockRejectedValue(new Error('DB Error'));

      await pedidoController.statusPedido(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao buscar status' });
    });
  });
});
