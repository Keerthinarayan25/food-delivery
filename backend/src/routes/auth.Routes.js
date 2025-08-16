import {Router} from 'express';
import { logIn, logOut, RestaurantSignUp, signUp, checkAuth } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const authRouter = Router();

authRouter.post('/signup',signUp);
authRouter.post('/login',logIn);
authRouter.post('/logout',logOut);
authRouter.post('/restaurant/signup', RestaurantSignUp);
authRouter.get('/checkAuth', verifyToken, checkAuth);

export default authRouter;
