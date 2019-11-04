import { Router } from 'express';

import gifController from '../controllers/gifs';

import verify from '../controllers/register';


const gifRouter = Router();

gifRouter.post('/gifs', verify.verifyToken ,gifController.postGif);
gifRouter.delete('/gifs/:id', verify.verifyToken, gifController.deleteGif);

export default gifRouter;