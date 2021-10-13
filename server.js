// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasVenta from './views/ventas/rutas.js';
//mongodb+srv://admin:OfDeFive2021@proyectoventas.pnk6d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVenta);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Verificando Puerto ${process.env.PORT}`);
  });
};

conectarBD(main);