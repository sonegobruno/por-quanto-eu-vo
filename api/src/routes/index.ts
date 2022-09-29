import { Router } from 'express';
import { userRoutes } from './user.routes';
import { authenticateRoutes } from './authenticate.routes';
import { carRoutes } from './car.routes';
import { ensureAuthenticated } from '../middlewares/ ensureAuthenticated';

const router = Router();

router.use("/user", userRoutes);
router.use("/car", ensureAuthenticated, carRoutes);
router.use("/sessions", authenticateRoutes);

export { router };
