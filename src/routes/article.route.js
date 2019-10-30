import { Router } from 'express';
import articleController from '../controllers/articles';
import  verify from '../controllers/sign-login';

const articleRouter = Router();

articleRouter.post('/articles', verify.verifyToken, articleController.createArticle);
articleRouter.patch('/articles/:id', verify.verifyToken, articleController.modifyArticle);

export default articleRouter;