/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { api } from "../services/api";
import { StatusEntrega } from "../components/StatusEntrega";
import { Card } from "../components/ui/card";
import { PackagePlus } from "lucide-react";

type PedidoResponse = {
  pedido: { id: number };
};

export function CriarPedido() {
  const [form, setForm] = useState({ x: "", y: "", peso: "", prioridade: "1" });
  const [mensagem, setMensagem] = useState("");
  const [pedidoId, setPedidoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const enviar = async () => {
    try {
      setLoading(true);
      const res = await api.post<PedidoResponse>("/pedidos", {
        x: Number(form.x),
        y: Number(form.y),
        peso: Number(form.peso),
        prioridade: Number(form.prioridade),
      });
      setMensagem("✅ Pedido criado com sucesso!");
      setPedidoId(res.data.pedido.id);
    } catch (err: any) {
      setMensagem("❌ " + (err.response?.data?.erro || "Erro ao criar pedido"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 space-y-4 shadow-lg">
      <div className="flex items-center gap-2 text-lg font-bold">
        <PackagePlus className="text-blue-500" /> Criar Novo Pedido
      </div>

      <Input
        placeholder="Coordenada X"
        value={form.x}
        onChange={(e) => setForm({ ...form, x: e.target.value })}
      />
      <Input
        placeholder="Coordenada Y"
        value={form.y}
        onChange={(e) => setForm({ ...form, y: e.target.value })}
      />
      <Input
        placeholder="Peso (kg)"
        value={form.peso}
        onChange={(e) => setForm({ ...form, peso: e.target.value })}
      />

      <select
        className="w-full border border-gray-300 rounded-md p-2"
        value={form.prioridade}
        onChange={(e) => setForm({ ...form, prioridade: e.target.value })}
      >
        <option value="1">📄 Baixa</option>
        <option value="2">⚡ Média</option>
        <option value="3">🔥 Alta</option>
      </select>

      <Button onClick={enviar} className="w-full" disabled={loading}>
        {loading ? "Enviando..." : "Enviar Pedido"}
      </Button>

      {mensagem && (
        <div className="mt-4 space-y-2">
          <p className="text-center text-sm">{mensagem}</p>
          {pedidoId && <StatusEntrega pedidoId={pedidoId} />}
        </div>
      )}
    </Card>
  );
}
