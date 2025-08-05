import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { DroneStatus } from "../utils/enums";  

import { alocarPedido } from "../services/alocacaoService"; 

export const criarPedido = async (req: Request, res: Response) => {
  try {
    const { destino, peso, prioridade } = req.body;

    if (!destino || peso == null || prioridade == null) {
      return res.status(400).json({ erro: "Campos obrigatórios: destino, peso, prioridade" });
    }

    const droneDisponivel = await prisma.drone.findFirst({
      where: {
        status: DroneStatus.DISPONIVEL,
        capacidade: {
          gte: peso,
        },
      },
    });

    if (!droneDisponivel) {
      return res.status(400).json({ erro: "Nenhum drone disponível suporta esse peso" });
    }

    const pedido = await prisma.pedido.create({
      data: {
        destino,
        peso,
        prioridade,
      },
    });

    await alocarPedido(pedido.id);

    return res.status(201).json({ mensagem: "Pedido criado com sucesso", pedido });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return res.status(500).json({ erro: "Erro ao criar o pedido" });
  }
};
