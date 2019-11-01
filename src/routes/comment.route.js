import { Router } from 'express';
import verify from '../controllers/sign-login';
import comment from '../controllers/comments';

const commentRouter = Router();

commentRouter.post('/articles/:id/comment', verify.verifyToken, comment.articleComment);

export default commentRouter;