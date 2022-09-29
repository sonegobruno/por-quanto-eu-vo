import { Router } from 'express';
import { CreateCarController } from '../modules/cars/useCases/CreateCar/CreateCarController';
import { ListCarsyUserIdController } from '../modules/cars/useCases/ListCarsByUserId/ListCarsByUserIdController';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listcarsByUserIdController = new ListCarsyUserIdController();

carRoutes.post('/', createCarController.handle);
carRoutes.get('/', listcarsByUserIdController.handle);

export { carRoutes }
