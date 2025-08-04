import { DroneStatus } from '../models/types';

export function proximoEstado(statusAtual: DroneStatus): DroneStatus {
  switch (statusAtual) {
    case DroneStatus.IDLE:
      return DroneStatus.CARREGANDO;
    case DroneStatus.CARREGANDO:
      return DroneStatus.EM_VOO;
    case DroneStatus.EM_VOO:
      return DroneStatus.ENTREGANDO;
    case DroneStatus.ENTREGANDO:
      return DroneStatus.RETORNANDO;
    case DroneStatus.RETORNANDO:
      return DroneStatus.IDLE;
    default:
      return DroneStatus.IDLE;
  }
}
