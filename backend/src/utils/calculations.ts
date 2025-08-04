import { Coordenada } from '../models/types';

export function calcularDistancia(p1: Coordenada, p2: Coordenada): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
