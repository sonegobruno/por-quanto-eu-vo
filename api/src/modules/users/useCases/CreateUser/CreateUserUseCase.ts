// import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';
import { AppError } from '../../../../errors';
import { ICreateUserDTO } from '../../dtos/ICreateUserDtO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUserRepository';

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ){}

    public async execute(data: ICreateUserDTO): Promise<void> {
      if(!data.name) {
        throw new AppError('Nome não informado')
      }

      if(!data.email) {
        throw new AppError('Email não informado')
      }

      if(!data.password) {
        throw new AppError('Senha não informada')
      }

      await this.userRepository.create(data);
    }
}

export { CreateUserUseCase };
