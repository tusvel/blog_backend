import Router from 'express';
import { userRouter } from './userRouter.js';
import { postRouter } from './postRouter.js';
import { commentRouter } from './commentRouter.js';
const router = new Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comment', commentRouter);

export { router };
