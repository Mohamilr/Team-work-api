import { Router } from 'express';
import verify from '../middleware/verify';
import get from '../controllers/get';

// configure route
const getRouter = Router();

getRouter.get('/feed', verify, get.getAllArticlesGif);
getRouter.get('/articles/:id', verify, get.getSingleArticle);
getRouter.get('/gifs/:id', verify, get.getSingleGif);

// export get route to server.js
export default getRouter;