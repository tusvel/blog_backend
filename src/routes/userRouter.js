import Router from 'express';
import { userController } from '../controllers/userController.js';
import { registerValidation, loginValidation } from '../validations/authValidate.js';
import { checkAuth } from '../utils/checkAuth.js';
import { handleErrors } from '../utils/handleErrors.js';
import multer from 'multer';
import path from 'path';
const userRouter = new Router();

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, path.resolve('src/avatar'));
  },
  filename(_, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

userRouter.post('/registration', registerValidation, handleErrors, userController.registration);
userRouter.post('/login', loginValidation, handleErrors, userController.login);
userRouter.get('/check', checkAuth, userController.check);
userRouter.post('/upload', upload.single('image'), (req, res) => {
  return res.json({
    url: `avatar/${req.file.originalname}`,
  });
});

export { userRouter };
