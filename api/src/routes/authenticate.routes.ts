import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ ensureAuthenticated';
import { AuthenticateUserController } from '../modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { ListAuthenticateUserController } from '../modules/users/useCases/ListAuthenticateuser/ListAuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const listAuthenticateUserController = new ListAuthenticateUserController();

authenticateRoutes.post('/', authenticateUserController.handle);

authenticateRoutes.get('/me', ensureAuthenticated, listAuthenticateUserController.handle);

export { authenticateRoutes }
