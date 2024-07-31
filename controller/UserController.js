import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../config/config.js';
import { enviarMailVerificacion } from '../services/mailService.js'; // Importar solo el servicio de verificación

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUsers = async (req, res) => {
  try {
    // Encriptar la contraseña antes de guardar el usuario
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await UserModel.create({
      ...req.body,
      password: hashedPassword,
      verified: true // Marcar el correo como verificado por defecto
    });

    // Generar token para verificación
    const token = jwt.sign({ id: user.id, email: user.email }, TOKEN_KEY, { expiresIn: '1h' });

    // Enviar correo de verificación (esto sigue igual para mantener la funcionalidad existente)
    await enviarMailVerificacion(user.email, token);

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: "Usuario eliminado" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (!user.verified) {
      return res.status(403).json({ error: 'Correo electrónico no verificado' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, TOKEN_KEY, {
      expiresIn: '2h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const updateUsersEmail = async (req, res) => {
  // Implementa la lógica de actualización del email del usuario
};

export const updateUsersPassword = async (req, res) => {
  // Implementa la lógica de actualización de la contraseña del usuario
};