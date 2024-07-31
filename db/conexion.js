// db/conexion.js
import { Sequelize } from 'sequelize';
import { DB_CONNECTION, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } from '../config/config.js';

export const sequelize = new Sequelize(
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_CONNECTION,
    logging: false,
  }
);

export default sequelize;