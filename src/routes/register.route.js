import { Router } from 'express';
import signLogin from '../controllers/register';

const userRouter = Router();

userRouter.post('/auth/create-user', signLogin.signUP);
userRouter.post('/auth/signin', signLogin.logIn);

export default userRouter;