import { useEffect, useState } from "react";
import { api } from "../services/api";

export function Drones() {
  type Drone = {
    id: number;
    nome: string;
    capacidade: number;
    bateria: number;
    status: string;
  };

  const [drones, setDrones] = useState<Drone[]>([]);

  useEffect(() => {
    api.get<Drone[]>("/drones/status").then((res) => setDrones(res.data));
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "IDLE":
        return "bg-green-100 text-green-800";
      case "CARREGANDO":
        return "bg-yellow-100 text-yellow-800";
      case "EM_VOO":
        return "bg-blue-100 text-blue-800";
      case "ENTREGANDO":
        return "bg-purple-100 text-purple-800";
      case "RETORNANDO":
        return "bg-indigo-100 text-indigo-800";
      case "MANUTENCAO":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">🚁 Status dos Drones</h2>

      <div className="overflow-x-auto border rounded-md shadow-sm bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Capacidade
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Bateria
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {drones.map((drone, i) => (
              <tr
                key={drone.id}
                className={
                  i % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-blue-50"
                }
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {drone.nome}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {drone.capacidade} kg
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {drone.bateria}%
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                      drone.status
                    )}`}
                  >
                    {drone.status}
                  </span>
                </td>
              </tr>
            ))}

            {drones.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Nenhum drone encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
