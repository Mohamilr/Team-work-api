import { Router } from 'express';
import articleController from '../controllers/articles';
import  verify from '../controllers/register';
// article middleware
import articleMiddleware from '../middleware/article.middleware';

// configure route
const articleRouter = Router();

articleRouter.post('/articles', verify.verifyToken, articleMiddleware.checkPost_ModifyArticle ,articleController.createArticle);
articleRouter.patch('/articles/:id', verify.verifyToken, articleMiddleware.checkPost_ModifyArticle ,articleController.modifyArticle);
articleRouter.delete('/articles/:id', verify.verifyToken, articleController.deleteArticle);

// export article route to server.js
export default articleRouter;