import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/rota', async (_, res) => {
  const entregas = await prisma.entrega.findMany({
    include: { pedido: true, drone: true },
  });

  const rotas = entregas.map((entrega) => ({
    drone: entrega.drone.nome,
    pedidoId: entrega.pedidoId,
    destino: {
      x: entrega.pedido.x,
      y: entrega.pedido.y,
    },
    tempo:
      entrega.fim && entrega.inicio
        ? (new Date(entrega.fim).getTime() - new Date(entrega.inicio).getTime()) / 1000
        : null,
  }));

  res.json(rotas);
});

export default router;
