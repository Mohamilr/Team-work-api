import { Router } from 'express';

import gifController from '../controllers/gifs';

import verify from '../controllers/register';

// middleware 
import gifMiddleware from '../middleware/gif.middleware';


const gifRouter = Router();

gifRouter.post('/gifs', verify.verifyToken, gifMiddleware.checkPostGif ,gifController.postGif);
gifRouter.delete('/gifs/:id', verify.verifyToken, gifController.deleteGif);

export default gifRouter;