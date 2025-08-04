export enum DroneStatus {
  IDLE = 'Idle',
  CARREGANDO = 'Carregando',
  EM_VOO = 'Em voo',
  ENTREGANDO = 'Entregando',
  RETORNANDO = 'Retornando',
  MANUTENCAO = 'Manutenção',
}

export enum PedidoStatus {
  PENDENTE = 'Pendente',
  EM_ENTREGA = 'Em entrega',
  ENTREGUE = 'Entregue',
  REJEITADO = 'Rejeitado',
}

export enum Prioridade {
  BAIXA = 1,
  MEDIA = 2,
  ALTA = 3,
}

export interface Coordenada {
  x: number;
  y: number;
}

export interface Drone {
  id: number;
  nome: string;
  capacidade: number;
  alcance: number;
  status: DroneStatus;
  bateria: number;
  localizacao: Coordenada;
}

export interface Pedido {
  id: number;
  destino: Coordenada;
  peso: number;
  prioridade: Prioridade;
  status: PedidoStatus;
}

export interface Entrega {
  id: number;
  droneId: number;
  pedidos: Pedido[];
  inicio?: Date;
  fim?: Date;
  estadoDrone: DroneStatus;
}

export interface Obstaculo {
  coordenada: Coordenada;
}
