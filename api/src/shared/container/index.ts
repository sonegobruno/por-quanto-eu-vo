import { container } from 'tsyringe';
import { IUsersRepository } from '../../modules/users/repositories/IUserRepository';
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository';
import { CarRepository } from '../../modules/cars/repositories/implementations/CarRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';


container.registerSingleton<IUsersRepository>(
    "UserRepository",
    UserRepository
);

container.registerSingleton<ICarsRepository>(
  "CarRepository",
  CarRepository
);
