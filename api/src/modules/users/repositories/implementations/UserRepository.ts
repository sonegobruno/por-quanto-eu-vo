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

    public async listUserById(user_id: string) {
      try {
        const user =  await this.repository.findOne({
          where: {
            id: user_id
          },
          select: ['name', 'email', 'created_at', 'update_at']
        });

        return user
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

    public async findByEmail(email: string): Promise<User | null> {
      try {
        const user =  await this.repository.findOne({
          where: {
            email
          },
        });

        return user
      } catch(err) {
        return null;
      }
    }
}

export { UserRepository };
