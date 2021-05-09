import Router from 'express';
import * as AuthController from '../controllers/auth';
import UserRepository from '../shared/repositories/user.repository';
const router = Router();
let userRepository = new UserRepository();

router.post('/register',AuthController.RegisterCtrl(userRepository));

router.post('/login',AuthController.LoginCtrl(userRepository));

export default router;