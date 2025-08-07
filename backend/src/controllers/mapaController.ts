import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const TAMANHO_MAPA_X = 10;
const TAMANHO_MAPA_Y = 10;

export const gerarMapa = async (_: Request, res: Response) => {
  const mapa = Array.from({ length: TAMANHO_MAPA_Y }, () => Array(TAMANHO_MAPA_X).fill('·'));

  const obstaculos = await prisma.obstaculo.findMany();
  obstaculos.forEach((o) => {
    if (mapa[o.y] && mapa[o.y][o.x]) mapa[o.y][o.x] = '█';
  });

  // Drones
  const drones = await prisma.drone.findMany();
  drones.forEach((d, i) => {
    const posX = 0;
    const posY = 0;
    if (mapa[posY] && mapa[posY][posX]) mapa[posY][posX] = 'D';
  });

  const pedidos = await prisma.pedido.findMany({ where: { entregue: false } });
  pedidos.forEach((p) => {
    if (mapa[p.y] && mapa[p.y][p.x] === '·') mapa[p.y][p.x] = 'P';
  });

  const ascii = mapa.map((linha) => linha.join(' ')).join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.send(ascii);
};
