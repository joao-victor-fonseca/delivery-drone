import { Router } from 'express';
import { gerarMapa } from '../controllers/mapaController';

const router = Router();
router.get('/', gerarMapa);
export default router;
