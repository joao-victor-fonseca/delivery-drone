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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Status dos Drones</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-muted text-left">
            <th className="p-2">Nome</th>
            <th className="p-2">Capacidade</th>
            <th className="p-2">Bateria</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {drones.map((drone, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{drone.nome}</td>
              <td className="p-2">{drone.capacidade}kg</td>
              <td className="p-2">{drone.bateria}%</td>
              <td className="p-2">{drone.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
