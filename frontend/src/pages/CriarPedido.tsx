/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { api } from "../services/api";

export function CriarPedido() {
  const [form, setForm] = useState({ x: "", y: "", peso: "", prioridade: "1" });
  const [mensagem, setMensagem] = useState("");

  const enviar = async () => {
    try {
      await api.post("/pedidos", {
        x: Number(form.x),
        y: Number(form.y),
        peso: Number(form.peso),
        prioridade: Number(form.prioridade),
      });
      setMensagem("✅ Pedido criado com sucesso!");
    } catch (err: any) {
      setMensagem("❌ " + err.response?.data?.erro || "Erro ao criar pedido");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
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
        className="w-full border border-input bg-background rounded-md p-2"
        value={form.prioridade}
        onChange={(e) => setForm({ ...form, prioridade: e.target.value })}
      >
        <option value="1">Baixa</option>
        <option value="2">Média</option>
        <option value="3">Alta</option>
      </select>
      <Button onClick={enviar}>Enviar Pedido</Button>
      {mensagem && <p className="text-center text-sm mt-4">{mensagem}</p>}
    </div>
  );
}
