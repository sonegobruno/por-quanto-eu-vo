import { Router } from 'express';
import { CreateUserController } from '../modules/users/useCases/CreateUser/CreateUserController';
import { ListUserByIdController } from '../modules/users/useCases/ListUser/ListUserByIdController';

const userRoutes = Router();

const listUserByIdController = new ListUserByIdController();
const createUserController = new CreateUserController();

userRoutes.get('/:user_id', listUserByIdController.handle);
userRoutes.post('/', createUserController.handle);

export { userRoutes }
