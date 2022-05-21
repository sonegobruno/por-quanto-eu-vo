import { Router } from 'express';
import { ListUserController } from '../modules/users/useCases/ListUser/ListUserController';

const userRoutes = Router();

const listUserController = new ListUserController();

userRoutes.get('/', listUserController.handle);

export { userRoutes }