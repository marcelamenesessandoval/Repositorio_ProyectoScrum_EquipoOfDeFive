import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const conectarBD = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error('Sin Conexion a la Base de Datos');
      return 'Error';
    }
    baseDeDatos = db.db('Ventas');
    console.log('Conexion Base De Datos Exitosa');
    return callback();
  });
};

const getDB = () => {
  return baseDeDatos;
};

export { conectarBD, getDB };