import { Router } from 'express';

import gifController from '../controllers/gifs';

import verify from '../controllers/sign-login';


const gifRouter = Router();

gifRouter.post('/gifs', verify.verifyToken ,gifController.postGif)


export default gifRouter;