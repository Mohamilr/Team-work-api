import { Router } from 'express';
import articleController from '../controllers/articles';
import  verify from '../controllers/register';

const articleRouter = Router();

articleRouter.post('/articles', verify.verifyToken, articleController.createArticle);
articleRouter.patch('/articles/:id', verify.verifyToken, articleController.modifyArticle);
articleRouter.delete('/articles/:id', verify.verifyToken, articleController.deleteArticle);

export default articleRouter;