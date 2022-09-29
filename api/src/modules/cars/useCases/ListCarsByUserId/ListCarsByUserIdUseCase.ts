import { inject, injectable} from 'tsyringe';
import { AppError } from '../../../../errors';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { Car } from '../../entities/Car';

@injectable()
class ListCarsByUserIdUseCase {

    constructor(
        @inject("CarRepository")
        private carsRepository: ICarsRepository,
    ){}

    public async execute(user_id: string): Promise<Car[]> {
      if(!user_id) {
        throw new AppError('Usuário não informado', 400)
      }

      const cars = await this.carsRepository.listCarsByUserId(user_id);
      return cars
    }
}

export { ListCarsByUserIdUseCase };
