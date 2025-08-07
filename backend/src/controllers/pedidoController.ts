import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { alocarPedido } from '../services/alocacaoService';

export const criarPedido = async (req: Request, res: Response) => {
  try {
    const { x, y, peso, prioridade } = req.body;

    if (x == null || y == null || peso == null || prioridade == null) {
      return res.status(400).json({ erro: 'Campos obrigatórios: x, y, peso, prioridade' });
    }

    const pedido = await prisma.pedido.create({
      data: { x, y, peso, prioridade },
    });

    await alocarPedido(pedido.id);

    return res.status(201).json({ mensagem: 'Pedido criado com sucesso', pedido });
  } catch (error: any) {
    console.error('Erro:', error.message);
    return res.status(400).json({ erro: error.message });
  }
};

export const statusPedido = async (req: Request, res: Response) => {
  try {
    const pedido = await prisma.pedido.findUnique({
      where: { id: Number(req.params.id) },
      include: { entrega: { include: { drone: true } } },
    });

    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    if (!pedido.entrega) {
      return res.json({ status: 'AGUARDANDO' });
    }

    return res.json({ status: pedido.entrega.drone.status });
  } catch (error: any) {
    console.error('Erro ao buscar status:', error.message);
    return res.status(500).json({ erro: 'Erro ao buscar status' });
  }
};
