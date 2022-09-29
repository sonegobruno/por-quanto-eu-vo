import { Router } from 'express';
import { CreateCarController } from '../modules/cars/useCases/CreateCar/CreateCarController';
import { DeleteCarByIdController } from '../modules/cars/useCases/DeleteCarById/DeleteCarByIdController';
import { ListCarByIdController } from '../modules/cars/useCases/ListCarById/ListCarByIdController';
import { ListCarsyUserIdController } from '../modules/cars/useCases/ListCarsByUserId/ListCarsByUserIdController';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarsByUserIdController = new ListCarsyUserIdController();
const listCarByIdController = new ListCarByIdController();
const deleteCarByIdController = new DeleteCarByIdController();

carRoutes.post('/', createCarController.handle);
carRoutes.get('/my-cars', listCarsByUserIdController.handle);
carRoutes.get('/:car_id', listCarByIdController.handle);
carRoutes.delete('/:car_id', deleteCarByIdController.handle);

export { carRoutes }
