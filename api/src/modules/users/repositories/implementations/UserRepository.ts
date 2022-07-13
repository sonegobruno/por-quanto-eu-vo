import { getRepository, Repository } from 'typeorm';
import { AppError } from '../../../../errors';
import { ICreateUserDTO } from '../../dtos/ICreateUserDtO';
import { User } from '../../entities/User';

import { IUsersRepository } from "../IUserRepository";

class UserRepository implements IUsersRepository{

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    public async list() {
      try {
        const users =  await this.repository.find({
          select: ['name', 'email', 'created_at', 'update_at']
        });

        return users
      } catch(err) {
        throw new AppError(err);
      }
    }

    public async create(data: ICreateUserDTO) {
      try {
        const user = this.repository.create(data)
        await this.repository.save(user)
      } catch(err) {
        throw new AppError(err);
      }
    }
}

export { UserRepository };
