import express from 'express';
import {
  login,
  getUsers,
  getOneUser,
  createUsers,
  updateUsers,
  deleteUsers,
  updateUsersEmail,
  updateUsersPassword,
} from '../controller/UserController.js';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../config/config.js';
import UserModel from '../models/UserModel.js';

const router = express.Router();

router.post('/login', login);
router.get('/users', getUsers);
router.get('/users/:id', getOneUser);
router.post('/users', createUsers);
router.put('/users/:id', updateUsers);
router.delete('/users/:id', deleteUsers);
router.put('/users/email/:id', updateUsersEmail);
router.put('/users/password/:id', updateUsersPassword);

// Ruta para verificar el correo electrónico
router.get('/verificar/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, TOKEN_KEY);
    const user = await UserModel.findByPk(decoded.id);
    if (user) {
      user.verified = true;
      await user.save();
      res.status(200).send('Correo verificado exitosamente.');
    } else {
      res.status(400).send('Token inválido.');
    }
  } catch (err) {
    res.status(400).send('Token inválido.');
  }
});
export default router;