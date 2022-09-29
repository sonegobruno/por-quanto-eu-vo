import { inject, injectable} from 'tsyringe';
import { AppError } from '../../../../errors';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { ICreateCarDTO } from '../../dtos/CreateCarDTO';
import { IUsersRepository } from '../../../users/repositories/IUserRepository';

@injectable()
class CreateCarUseCase {

    constructor(
        @inject("CarRepository")
        private carsRepository: ICarsRepository,
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ){}

    public async execute(data: ICreateCarDTO): Promise<void> {
      if(!data.name) {
        throw new AppError('Nome não informado', 400, 'name')
      }

      if(!data.description) {
        throw new AppError('Descrição não informada', 400, 'description')
      }

      if(!data.alcohol_consumption) {
        throw new AppError('Quantidade consumível de alcool não informado', 400, 'alcohol_consumption')
      }

      if(isNaN(data.alcohol_consumption)) {
        throw new AppError('Quantidade consumível de alcool não possui um número válido', 400, 'alcohol_consumption')
      }

      if(!data.gas_consumption) {
        throw new AppError('Quantidade consumível de gasolina não informada', 400, 'gas_consumption')
      }

      if(isNaN(data.gas_consumption)) {
        throw new AppError('Quantidade consumível de gasolina não possui um número válido', 400, 'gas_consumption')
      }

      const userExist = await this.userRepository.listUserById(data.user_id)

      if(!userExist) {
        throw new AppError('Usuário não cadastrado em nosso banco de dados', 400)
      }

      await this.carsRepository.create(data);
    }
}

export { CreateCarUseCase };
