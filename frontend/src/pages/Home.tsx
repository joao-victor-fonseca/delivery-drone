import { useEffect, useState } from "react";
import { DashboardMetrics } from "../components/DashboardMetrics";
import { EntregaChart } from "../components/EntregaChart";
import { api } from "../services/api";

export function Home() {
  type RotaEntrega = {
    drone: string;
    pedidoId: number;
    destino: { x: number; y: number };
    tempo: number | null;
  };

  const [dados, setDados] = useState({ entregas: 0, media: 0, melhor: "" });
  const [grafico, setGrafico] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await api.get<RotaEntrega[]>("/entregas/rota");
      const lista = res.data;

      const media =
        lista
          .filter((e: RotaEntrega) => e.tempo)
          .reduce((acc: number, e: RotaEntrega) => acc + (e.tempo || 0), 0) /
        lista.length;

      const drones = lista.reduce(
        (acc: Record<string, number>, e: RotaEntrega) => {
          acc[e.drone] = (acc[e.drone] || 0) + 1;
          return acc;
        },
        {}
      );

      const melhor =
        Object.entries(drones).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
      const graficoData = Object.entries(drones).map(([name, value]) => ({
        name,
        value,
      }));

      setDados({ entregas: lista.length, media: media || 0, melhor });
      setGrafico(graficoData);
    }
    fetchData();
  }, []);

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-6">
        <DashboardMetrics
          title="Total de Entregas"
          value={String(dados.entregas)}
        />
        <DashboardMetrics
          title="Tempo Médio (s)"
          value={dados.media.toFixed(2)}
        />
        <DashboardMetrics title="Drone Mais Ativo" value={dados.melhor} />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Entregas por Drone</h3>
        <EntregaChart data={grafico} />
      </div>
    </div>
  );
}
