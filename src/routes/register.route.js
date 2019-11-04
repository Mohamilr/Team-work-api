import { Router } from 'express';
import signLogin from '../controllers/register';
// middleware
import registerMiddleware from '../middleware/register.middleware';

const userRouter = Router();

userRouter.post('/auth/create-user', registerMiddleware.checkSignUp ,signLogin.signUP);
userRouter.post('/auth/signin', signLogin.logIn);

export default userRouter;