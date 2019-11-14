import { Router } from 'express';

import gifController from '../controllers/gifs';

import verify from '../controllers/register';

// import gif middleware 
import gifMiddleware from '../middleware/gif.middleware';

// configure route
const gifRouter = Router();

gifRouter.post('/gifs', verify.verifyToken, gifMiddleware.checkPostGif ,gifController.postGif);
gifRouter.delete('/gifs/:id', verify.verifyToken, gifController.deleteGif);

// export gif route to server.js
export default gifRouter;