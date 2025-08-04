export function calcularConsumoBateria(distancia: number, taxaConsumoPorKm = 2): number {
  return distancia * taxaConsumoPorKm * 2;
}

export function verificarBateriaSuficiente(bateriaAtual: number, distancia: number): boolean {
  const consumo = calcularConsumoBateria(distancia);
  return bateriaAtual >= consumo;
}

export function recarregarBateria(): number {
  return 100;
}
