import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/home";
import { CriarPedido } from "./pages/CriarPedido";
import { Entregas } from "./pages/Entregas";
import { Drones } from "./pages/Drones";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex">
        <aside className="w-64 bg-muted p-6 space-y-6 shadow-md">
          <h2 className="text-2xl font-bold">🚁 Drone Delivery</h2>
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <Link to="/">🏠 Dashboard</Link>
            <Link to="/pedido">➕ Criar Pedido</Link>
            <Link to="/entregas">📦 Entregas</Link>
            <Link to="/drones">🚁 Drones</Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pedido" element={<CriarPedido />} />
            <Route path="/entregas" element={<Entregas />} />
            <Route path="/drones" element={<Drones />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
