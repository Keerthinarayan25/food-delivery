import {Router} from 'express';
import { logIn, logOut, signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/signup',signUp);
authRouter.post('/login',logIn);
authRouter.post('/logout',logOut);

export default authRouter;
