// index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { sequelize } from './db/conexion.js'; // Verifica que la exportación sea correcta
import UserRouter from './router/UserRouter.js';
import RestauranteRouter from './router/RestauranteRouter.js';
import ReservaRouter from './router/ReservaRouter.js';
import { PORT } from './config/config.js'; // Verifica que PORT esté exportado correctamente desde config.js

const app = express();

app.use(express.json());
app.use('/api', UserRouter);
app.use('/api', RestauranteRouter);
app.use('/api', ReservaRouter);

sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => console.error('Error al sincronizar la base de datos', err));