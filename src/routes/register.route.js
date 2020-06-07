import { Router } from 'express';
import signLogin from '../controllers/register';
// import user middleware
import registerMiddleware from '../middleware/register.middleware';

// configure route
const userRouter = Router();

userRouter.post('/auth/create-user', registerMiddleware.checkSignUp, signLogin.signUP);
userRouter.post('/auth/signin', signLogin.logIn);

// export user route to server.js
export default userRouter;