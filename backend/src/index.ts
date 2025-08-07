import express from 'express';
import cors from 'cors';

import pedidosRouter from './routes/pedidos.routes';
import dronesRouter from './routes/drones.routes';
import entregasRouter from './routes/entregas.routes';
import mapaRouter from './routes/mapa.routes';

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

app.use('/pedidos', pedidosRouter);
app.use('/drones', dronesRouter);
app.use('/entregas', entregasRouter);
app.use('/mapa', mapaRouter);

app.get('/', (req, res) => {
  res.send('API Drone Delivery rodando 🚁');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
