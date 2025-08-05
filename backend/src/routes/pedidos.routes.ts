import { Router } from "express";
import { criarPedido } from "../controllers/pedidoController";

const router = Router();

router.post("/", criarPedido);

export default router;
