import Router from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { commentController } from '../controllers/commentCountroller.js';
const commentRouter = new Router();

commentRouter.post('/create/:id', checkAuth, commentController.create);
commentRouter.get('/getAllByPost/:id', commentController.getAllByPost);
commentRouter.get('/getAll', commentController.getAll);

export { commentRouter };
