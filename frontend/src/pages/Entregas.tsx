import { useEffect, useState } from "react";
import { api } from "../services/api";

export function Entregas() {
  type RotaEntrega = {
    drone: string;
    pedidoId: number;
    destino: { x: number; y: number };
    tempo: number | null;
  };

  const [dados, setDados] = useState<RotaEntrega[]>([]);

  useEffect(() => {
    api.get<RotaEntrega[]>("/entregas/rota").then((res) => setDados(res.data));
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">
        📦 Histórico de Entregas
      </h2>
      <div className="overflow-x-auto border rounded-md shadow-sm bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Pedido
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Drone
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Destino (X, Y)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Tempo (s)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dados.map((e, i) => {
              const entregue = e.tempo !== null;
              return (
                <tr
                  key={e.pedidoId}
                  className={
                    i % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-blue-50"
                  }
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    #{e.pedidoId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{e.drone}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ({e.destino.x}, {e.destino.y})
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {entregue ? e.tempo!.toFixed(1) : "Em andamento"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        entregue
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {entregue ? "Concluído" : "Em andamento"}
                    </span>
                  </td>
                </tr>
              );
            })}
            {dados.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Nenhuma entrega encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
