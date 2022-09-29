import { inject, injectable} from 'tsyringe';
import { AppError } from '../../../../errors';
import { ICarsRepository } from '../../repositories/ICarsRepository';

@injectable()
class DeleteCarByIdUseCase {

    constructor(
        @inject("CarRepository")
        private carsRepository: ICarsRepository,
    ){}

    public async execute(user_id: string, car_id: string): Promise<void> {
      if(!user_id) {
        throw new AppError('Usuário não informado', 400)
      }

      const carExist = await this.carsRepository.listCarById(user_id, car_id)

      if(!carExist) {
        throw new AppError('Carro não encontrado', 400)
      }

      await this.carsRepository.deleteCarById(user_id, car_id);
    }
}

export { DeleteCarByIdUseCase };
