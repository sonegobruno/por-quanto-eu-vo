import { ICreateUserDTO } from '../dtos/ICreateUserDtO';
import { User } from '../entities/User';

export interface IUsersRepository {
  listUserById(user_id: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<void>;
}
