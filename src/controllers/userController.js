import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

class UserController {
  async registration(req, res) {
    try {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(5);
      const hash = await bcrypt.hash(password, salt);

      const doc = new UserModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
        avatarUrl: req.body.avatarUrl,
      });
      const user = await doc.save();

      const token = jwt.sign(
        {
          _id: user._id,
        },
        'secret123',
        {
          expiresIn: '30d',
        },
      );

      const { passwordHash, ...userData } = user._doc;
      return res.json({
        ...userData,
        token,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json('Произошла ошибка регистрации');
    }
  }
  async login(req, res) {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          message: 'Неверный логин или пароль',
        });
      }
      const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);
      if (!isValidPass) {
        return res.status(404).json({
          message: 'Неверный логин или пароль',
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        'secret123',
        {
          expiresIn: '30d',
        },
      );

      const { passwordHash, ...userData } = user._doc;
      return res.json({
        ...userData,
        token,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json('Произошла ошибка авторизации');
    }
  }
  async check(req, res) {
    try {
      const user = await UserModel.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          message: 'Пользователь не найден',
        });
      }

      const { passwordHash, ...userData } = user._doc;
      return res.json({
        ...userData,
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: 'Ошибка',
      });
    }
  }
}

const userController = new UserController();

export { userController };
