import { Router } from 'express';

import gifController from '../controllers/gifs';

import verify from '../middleware/verify';

// import gif middleware 
import gifMiddleware from '../middleware/gif.middleware';

// configure route
const gifRouter = Router();

gifRouter.post('/gifs', verify, gifMiddleware.checkPostGif ,gifController.postGif);
gifRouter.delete('/gifs/:id', verify, gifController.deleteGif);

// export gif route to server.js
export default gifRouter;