import {Router} from 'express';
import { logIn, logOut, RestaurantSignUp, signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/signup',signUp);
authRouter.post('/login',logIn);
authRouter.post('/logout',logOut);
authRouter.post('/restaurant/signup', RestaurantSignUp);


export default authRouter;
