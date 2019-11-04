import { Router } from 'express';
import articleController from '../controllers/articles';
import  verify from '../controllers/register';
// middleware
import articleMiddleware from '../middleware/article.middleware';

const articleRouter = Router();

articleRouter.post('/articles', verify.verifyToken, articleMiddleware.checkPost_ModifyArticle ,articleController.createArticle);
articleRouter.patch('/articles/:id', verify.verifyToken, articleMiddleware.checkPost_ModifyArticle ,articleController.modifyArticle);
articleRouter.delete('/articles/:id', verify.verifyToken, articleController.deleteArticle);

export default articleRouter;