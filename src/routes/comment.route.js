import { Router } from 'express';
import verify from '../controllers/register';
import comment from '../controllers/comments';

const commentRouter = Router();

commentRouter.post('/articles/:id/comment', verify.verifyToken, comment.articleComment);
commentRouter.post('/gifs/:id/comment', verify.verifyToken, comment.gifComment);

export default commentRouter;