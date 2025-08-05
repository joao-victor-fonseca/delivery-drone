import { prisma } from "../lib/prisma";
import { DroneStatus } from "../utils/enums";

export const alocarPedido = async (pedidoId: number) => {
  const pedido = await prisma.pedido.findUnique({ where: { id: pedidoId } });
  if (!pedido) throw new Error("Pedido não encontrado");

  const drone = await prisma.drone.findFirst({
    where: {
      status: DroneStatus.DISPONIVEL,
      capacidade: {
        gte: pedido.peso,
      },
    },
  });

  if (!drone) throw new Error("Nenhum drone disponível para esse pedido");

 
  await prisma.entrega.create({
    data: {
      droneId: drone.id,
      pedidoId: pedido.id,
      inicio: new Date(),
    },
  });

 
  await prisma.drone.update({
    where: { id: drone.id },
    data: { status: DroneStatus.EM_VOO },
  });

};
