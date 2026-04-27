import express from 'express';
import { register, loginAdmin } from '../controllers/auth.controller';
import listEndpoints from 'express-list-endpoints';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login-admin', loginAdmin);
// console.log(listEndpoints(authRouter));


export default authRouter;