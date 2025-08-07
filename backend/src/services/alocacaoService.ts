import { prisma } from '../lib/prisma';
import { DroneStatus } from '../utils/enums';

const BASE_X = 0;
const BASE_Y = 0;

export function calcularDistancia(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export const alocarPedido = async (pedidoId: number) => {
  const pedido = await prisma.pedido.findUnique({ where: { id: pedidoId } });
  if (!pedido) throw new Error('Pedido não encontrado');

  const obstaculo = await prisma.obstaculo.findFirst({
    where: {
      x: pedido.x,
      y: pedido.y,
    },
  });

  if (obstaculo) throw new Error('Destino em zona de exclusão aérea');

  const drone = await prisma.drone.findFirst({
    where: {
      status: { equals: DroneStatus.IDLE },
      capacidade: { gte: pedido.peso },
    },
  });

  if (!drone) throw new Error('Nenhum drone disponível para este pedido');

  const distancia = calcularDistancia(BASE_X, BASE_Y, pedido.x, pedido.y);
  const totalKm = Math.ceil(distancia * 2);
  const bateriaRestante = drone.bateria - totalKm;

  if (bateriaRestante < 0) {
    throw new Error('Drone sem bateria suficiente');
  }

  await prisma.drone.update({
    where: { id: drone.id },
    data: { status: { set: DroneStatus.CARREGANDO } },
  });

  setTimeout(async () => {
    await prisma.drone.update({
      where: { id: drone.id },
      data: { status: { set: DroneStatus.EM_VOO } },
    });

    const entrega = await prisma.entrega.create({
      data: {
        droneId: drone.id,
        pedidoId: pedido.id,
        inicio: new Date(),
      },
    });

    setTimeout(async () => {
      await prisma.drone.update({
        where: { id: drone.id },
        data: { status: { set: DroneStatus.ENTREGANDO } },
      });

      setTimeout(async () => {
        await prisma.drone.update({
          where: { id: drone.id },
          data: { status: { set: DroneStatus.RETORNANDO } },
        });

        await prisma.entrega.update({
          where: { id: entrega.id },
          data: { fim: new Date() },
        });

        await prisma.pedido.update({
          where: { id: pedido.id },
          data: { entregue: true },
        });

        setTimeout(async () => {
          const novoStatus: DroneStatus =
            bateriaRestante < 20 ? DroneStatus.MANUTENCAO : DroneStatus.IDLE;

          await prisma.drone.update({
            where: { id: drone.id },
            data: {
              status: { set: novoStatus },
              bateria: bateriaRestante,
            },
          });
        }, 1000);
      }, 1000);
    }, 2000);
  }, 2000);
};
