import { useEffect, useState } from "react";
import { api } from "../services/api";

export function Mapa() {
  const [mapa, setMapa] = useState("");

  useEffect(() => {
    const carregarMapa = async () => {
      const res = await api.get("/mapa", { responseType: "text" });
      setMapa(res.data);
    };
    carregarMapa();
    const interval = setInterval(carregarMapa, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre className="bg-black text-green-400 p-4 rounded overflow-auto">
      {mapa}
    </pre>
  );
}
