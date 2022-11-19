import * as path from 'path';
import Router from 'express';
import multer from 'multer';
import { postController } from '../controllers/postController.js';
import { postValidation } from '../validations/postValidate.js';
import { checkAuth } from '../utils/checkAuth.js';
import { handleErrors } from '../utils/handleErrors.js';
const postRouter = new Router();

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, path.resolve('src/static'));
  },
  filename(_, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

postRouter.post('/create', checkAuth, postValidation, handleErrors, postController.create);
postRouter.get('/getAll', postController.getAll);
postRouter.get('/getAllByTag/:tag', postController.getAllByTag);
postRouter.get('/getOne/:id', postController.getOne);
postRouter.delete('/delete/:id', checkAuth, postController.delete);
postRouter.patch('/update/:id', checkAuth, postValidation, handleErrors, postController.update);
postRouter.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  return res.json({
    url: `static/${req.file.originalname}`,
  });
});

postRouter.get('/tags', postController.getTags);

export { postRouter };
