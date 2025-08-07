import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/status', async (_, res) => {
  const drones = await prisma.drone.findMany();
  res.json(drones);
});

export default router;
