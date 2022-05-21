import { container } from 'tsyringe';
import { IUsersRepository } from '../../modules/repositories/implementations/IUserRepository';
import { UserRepository } from '../../modules/repositories/implementations/UserRepository';


container.registerSingleton<IUsersRepository>(
    "UserRepository",
    UserRepository
);
