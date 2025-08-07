import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { CriarPedido } from "./pages/CriarPedido";
import { Entregas } from "./pages/Entregas";
import { Drones } from "./pages/Drones";
import { Mapa } from "./pages/Mapa";
import { LayoutDashboard, PlusCircle, Package, Plane, Map } from "lucide-react";

export default function App() {
  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/pedido", label: "Criar Pedido", icon: <PlusCircle size={18} /> },
    { path: "/entregas", label: "Entregas", icon: <Package size={18} /> },
    { path: "/drones", label: "Drones", icon: <Plane size={18} /> },
    { path: "/mapa", label: "Mapa", icon: <Map size={18} /> },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              🚁 Drone Delivery
            </h2>
          </div>
          <nav className="flex flex-col gap-1 p-4 flex-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-colors 
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t text-xs text-gray-500">
            © {new Date().getFullYear()} Drone Delivery
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pedido" element={<CriarPedido />} />
            <Route path="/entregas" element={<Entregas />} />
            <Route path="/drones" element={<Drones />} />
            <Route path="/mapa" element={<Mapa />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
