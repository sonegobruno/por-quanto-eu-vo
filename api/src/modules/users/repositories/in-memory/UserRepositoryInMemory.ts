import { ICreateUserDTO } from '../../dtos/ICreateUserDtO';
import { User } from '../../entities/User';
import { IUsersRepository } from './../IUserRepository';

class UserRepositoryInMemory implements IUsersRepository {

  users: User[] = []

  async listUserById(user_id: string): Promise<User> {
    const user = this.users.find(user => user.id === user_id)

    delete user?.password;

    return user
  }
  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      ...data,
      created_at: new Date(),
      update_at: new Date()
    })

    this.users.push(user)
  }

}

export { UserRepositoryInMemory }
