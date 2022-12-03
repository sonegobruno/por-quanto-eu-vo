import { getRepository, Repository } from 'typeorm';
import { AppError } from '../../../../errors';
import { ICreateUsersTokensDTO } from '../../dtos/ICreateUsersTokensDTO';
import { UsersTokens } from '../../entities/UsersTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {

    private repository: Repository<UsersTokens>

    constructor() {
        this.repository = getRepository(UsersTokens)
    }

    public async create(data: ICreateUsersTokensDTO): Promise<UsersTokens> {
      try {
        const userToken = this.repository.create(data)
        await this.repository.save(userToken)

        return userToken
      } catch(err) {
        throw new AppError(err);
      }
    }

    public async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens> {
      try {
        const usersTokens = await this.repository.findOne({
          user_id,
          refresh_token
        })

        return usersTokens
      } catch(err) {
        throw new AppError(err);
      }
    }

    public async deleteById(id: string): Promise<void> {
      try {
        await this.repository.delete(id)
      } catch(err) {
        throw new AppError(err);
      }
    }
}

export { UsersTokensRepository };
