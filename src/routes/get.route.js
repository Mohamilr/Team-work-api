import { Router } from 'express';
import verify from '../controllers/register';
import get from '../controllers/get';

const getRouter = Router();

getRouter.get('/feed', verify.verifyToken ,get.getAllArticlesGif);
getRouter.get('/articles/:id', verify.verifyToken ,get.getSingleArticle);
getRouter.get('/gifs/:id', verify.verifyToken, get.getSingleGif);

export default getRouter;