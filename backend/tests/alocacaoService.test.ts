const mockPrisma = {
  pedido: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  obstaculo: {
    findFirst: jest.fn(),
  },
  drone: {
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  entrega: {
    create: jest.fn(),
    update: jest.fn(),
  },
};

jest.mock('../src/lib/prisma', () => ({
  prisma: mockPrisma,
}));

import { alocarPedido } from '../src/services/alocacaoService';
import { DroneStatus } from '../src/utils/enums';

describe('alocarPedido', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('lança erro se o pedido não for encontrado', async () => {
    mockPrisma.pedido.findUnique.mockResolvedValue(null);
    await expect(alocarPedido(1)).rejects.toThrow('Pedido não encontrado');
  });

  it('lança erro se o destino for uma zona de exclusão aérea', async () => {
    mockPrisma.pedido.findUnique.mockResolvedValue({ id: 1, x: 2, y: 3, peso: 10 });
    mockPrisma.obstaculo.findFirst.mockResolvedValue({ id: 1 });

    await expect(alocarPedido(1)).rejects.toThrow('Destino em zona de exclusão aérea');
  });

  it('lança erro se nenhum drone estiver disponível', async () => {
    mockPrisma.pedido.findUnique.mockResolvedValue({ id: 1, x: 2, y: 3, peso: 10 });
    mockPrisma.obstaculo.findFirst.mockResolvedValue(null);
    mockPrisma.drone.findFirst.mockResolvedValue(null);

    await expect(alocarPedido(1)).rejects.toThrow('Nenhum drone disponível para este pedido');
  });

  it('lança erro se o drone não tiver bateria suficiente', async () => {
    mockPrisma.pedido.findUnique.mockResolvedValue({ id: 1, x: 10, y: 10, peso: 10 });
    mockPrisma.obstaculo.findFirst.mockResolvedValue(null);
    mockPrisma.drone.findFirst.mockResolvedValue({
      id: 1,
      capacidade: 15,
      bateria: 5,
      status: DroneStatus.IDLE,
    });

    await expect(alocarPedido(1)).rejects.toThrow('Drone sem bateria suficiente');
  });

  it('executa com sucesso quando tudo está certo', async () => {
    mockPrisma.pedido.findUnique.mockResolvedValue({ id: 1, x: 1, y: 1, peso: 5 });
    mockPrisma.obstaculo.findFirst.mockResolvedValue(null);
    mockPrisma.drone.findFirst.mockResolvedValue({
      id: 1,
      capacidade: 10,
      bateria: 100,
      status: DroneStatus.IDLE,
    });
    mockPrisma.drone.update.mockResolvedValue({});
    mockPrisma.entrega.create.mockResolvedValue({ id: 123 });

    await expect(alocarPedido(1)).resolves.not.toThrow();
  });
});
