import { Router } from 'express';
import { criarPedido, statusPedido } from '../controllers/pedidoController';

const router = Router();

router.post('/', criarPedido);
router.get('/:id/status', statusPedido);

export default router;
