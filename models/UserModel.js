import { DataTypes } from 'sequelize';
import { sequelize } from '../db/conexion.js';

const UserModel = sequelize.define('UserModel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Correo verificado por defecto
  },
}, {
  tableName: 'users',
  timestamps: false,
});

export default UserModel;
