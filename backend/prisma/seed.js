import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.obstaculo.createMany({
    data: [
      { x: 5, y: 10 },
      { x: 6, y: 10 },
      { x: 7, y: 10 },
    ],
  });

  await prisma.drone.createMany({
    data: [
      { nome: 'Drone A', capacidade: 10, status: 'DISPONIVEL' },
      { nome: 'Drone B', capacidade: 15, status: 'DISPONIVEL' },
    ],
  });

  console.log('Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
