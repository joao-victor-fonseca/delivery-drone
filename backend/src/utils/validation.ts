import { Pedido, Drone, Coordenada } from '../models/types';
import { calcularDistancia } from './calculations';

export function validarPedido(pedido: Pedido, drone: Drone, base: Coordenada): boolean {
  if (pedido.peso > drone.capacidade) {
    return false;
  }
  const distancia = calcularDistancia(base, pedido.destino);
  if (distancia * 2 > drone.alcance) {
    return false;
  }
  return true;
}
