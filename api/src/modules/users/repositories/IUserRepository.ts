import { ICreateUserDTO } from '../dtos/ICreateUserDtO';
import { User } from '../entities/User';

export interface IUsersRepository {
  listUserById(user_id: string): Promise<User>;
  checkIfEmailAlreadyExist(email: string): Promise<boolean>;
  create(data: ICreateUserDTO): Promise<void>;
}
