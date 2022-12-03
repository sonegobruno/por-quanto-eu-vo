import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ ensureAuthenticated';
import { RefreshTokenController } from '../modules/users-tokens/useCases/RefreshTokenController';
import { AuthenticateUserController } from '../modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { ListAuthenticateUserController } from '../modules/users/useCases/ListAuthenticateuser/ListAuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const listAuthenticateUserController = new ListAuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/', authenticateUserController.handle);

authenticateRoutes.get('/me', ensureAuthenticated, listAuthenticateUserController.handle);

authenticateRoutes.post('/refresh-token', refreshTokenController.handle);


export { authenticateRoutes }
