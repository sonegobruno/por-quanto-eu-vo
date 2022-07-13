import { ICreateUserDTO } from '../dtos/ICreateUserDtO';
import { User } from '../entities/User';

export interface IUsersRepository {
   list(): Promise<User[]>;
   create(data: ICreateUserDTO): Promise<void>;
}
