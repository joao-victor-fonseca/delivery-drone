import express from "express";
import cors from "cors";
import pedidoRoutes from "./routes/pedidoRoutes";

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/pedidos", pedidoRoutes);

app.get("/", (req, res) => {
  res.send("API Drone Delivery rodando 🚁");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
