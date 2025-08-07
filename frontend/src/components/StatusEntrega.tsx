import { useEffect, useState } from "react";
import { api } from "../services/api";
import * as Progress from "@radix-ui/react-progress";
import { Loader2, PackageCheck, Plane, Warehouse, Box } from "lucide-react";

type StatusResponse = {
  status: string;
};

const statusEtapas = [
  "AGUARDANDO",
  "CARREGANDO",
  "EM_VOO",
  "ENTREGANDO",
  "RETORNANDO",
  "IDLE",
];

export function StatusEntrega({ pedidoId }: { pedidoId: number }) {
  const [status, setStatus] = useState("AGUARDANDO");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get<StatusResponse>(
          `/pedidos/${pedidoId}/status`
        );
        const statusAtual = res.data.status.toUpperCase();
        setStatus(statusAtual);

        const etapaIndex = statusEtapas.indexOf(statusAtual);
        if (etapaIndex >= 0) {
          setProgress(((etapaIndex + 1) / statusEtapas.length) * 100);
        }
      } catch {
        setStatus("ERRO");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [pedidoId]);

  const getStatusInfo = () => {
    switch (status) {
      case "AGUARDANDO":
        return { label: "Aguardando alocação de drone", icon: <Box /> };
      case "CARREGANDO":
        return {
          label: "Carregando pacote",
          icon: <Loader2 className="animate-spin" />,
        };
      case "EM_VOO":
        return { label: "Drone a caminho", icon: <Plane /> };
      case "ENTREGANDO":
        return { label: "Entregando pacote", icon: <PackageCheck /> };
      case "RETORNANDO":
        return { label: "Retornando à base", icon: <Warehouse /> };
      case "IDLE":
        return {
          label: "Entrega finalizada",
          icon: <PackageCheck className="text-green-500" />,
        };
      default:
        return { label: "Erro ao buscar status", icon: <Loader2 /> };
    }
  };

  const { label, icon } = getStatusInfo();

  return (
    <div className="mt-4 p-4 border rounded-md shadow-sm bg-white space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        <span>{label}</span>
      </div>
      <Progress.Root
        className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2"
        value={progress}
      >
        <Progress.Indicator
          className="bg-green-500 h-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </Progress.Root>
    </div>
  );
}
