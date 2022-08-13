// import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';
import { AppError } from '../../../../errors';
import { ICreateUserDTO } from '../../dtos/ICreateUserDtO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUserRepository';
import { hash } from 'bcrypt';

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

      const emailAlreadyExist = await this.userRepository.checkIfEmailAlreadyExist(data.email)

      if(emailAlreadyExist) {
        throw new AppError('Este E-mail ja foi cadastrado, por favor digite um novo E-mail')
      }

      const passwordHash = await hash(data.password, 8);

      await this.userRepository.create({
        ...data,
        password: passwordHash
      });
    }
}

export { CreateUserUseCase };
