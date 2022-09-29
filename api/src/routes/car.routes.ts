import { Router } from 'express';
import { CreateCarController } from '../modules/cars/useCases/CreateCar/CreateCarController';
import { ListCarByIdController } from '../modules/cars/useCases/ListCarById/ListCarByIdController';
import { ListCarsyUserIdController } from '../modules/cars/useCases/ListCarsByUserId/ListCarsByUserIdController';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listcarsByUserIdController = new ListCarsyUserIdController();
const listcarByIdController = new ListCarByIdController();

carRoutes.post('/', createCarController.handle);
carRoutes.get('/my-cars', listcarsByUserIdController.handle);
carRoutes.get('/:car_id', listcarByIdController.handle);

export { carRoutes }
