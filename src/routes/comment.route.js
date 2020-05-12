import { Router } from 'express';
import verify from '../middleware/verify';
import comment from '../controllers/comments';

// configure route
const commentRouter = Router();

commentRouter.post('/articles/:id/comment', verify, comment.articleComment);
commentRouter.post('/gifs/:id/comment', verify, comment.gifComment);

// export comment route to server.js
export default commentRouter;