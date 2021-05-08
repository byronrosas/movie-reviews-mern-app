import Router from 'express';
import UserRepository from '../../shared/repositories/user.repository';
import * as AuthController from '../controllers/auth';
const router = Router();
let userRepository = new UserRepository();

router.post('/register',AuthController.RegisterCtrl(userRepository));

router.post('/login',AuthController.LoginCtrl(userRepository));

export default router;