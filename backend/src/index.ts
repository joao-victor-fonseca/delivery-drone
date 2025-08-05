import express from "express";
import cors from "cors";
import pedidosRouter from './routes/pedidos.routes';
import { prisma } from "./lib/prisma"; 

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());


app.use("/pedidos", pedidosRouter);

app.get("/", (req, res) => {
  res.send("API Drone Delivery rodando 🚁");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
