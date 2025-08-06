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
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Histórico de Entregas</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-muted text-left">
            <th className="p-2">Pedido</th>
            <th className="p-2">Drone</th>
            <th className="p-2">Destino</th>
            <th className="p-2">Tempo (s)</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((e, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">#{e.pedidoId}</td>
              <td className="p-2">{e.drone}</td>
              <td className="p-2">
                ({e.destino.x},{e.destino.y})
              </td>
              <td className="p-2">
                {e.tempo ? e.tempo.toFixed(1) : "Em andamento"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
