// import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';
import { AppError } from '../../../../errors';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUserRepository';

@injectable()
class ListUserByIdUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ){}

    public async execute(user_id: string): Promise<User> {
      const user =  await this.userRepository.listUserById(user_id);

      if(!user?.id) {
        throw new AppError('Usuário não encontrado', 404)
      }

      return user
    }
}

export { ListUserByIdUseCase };
