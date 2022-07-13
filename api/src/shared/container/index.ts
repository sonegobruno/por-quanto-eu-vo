import { container } from 'tsyringe';
import { IUsersRepository } from '../../modules/users/repositories/IUserRepository';
import { UserRepository } from '../../modules/users/repositories/implementations/UserRepository';


container.registerSingleton<IUsersRepository>(
    "UserRepository",
    UserRepository
);
