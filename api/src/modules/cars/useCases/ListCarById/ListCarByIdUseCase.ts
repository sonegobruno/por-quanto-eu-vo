import { inject, injectable} from 'tsyringe';
import { AppError } from '../../../../errors';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { Car } from '../../entities/Car';

@injectable()
class ListCarByIdUseCase {

    constructor(
        @inject("CarRepository")
        private carsRepository: ICarsRepository,
    ){}

    public async execute(user_id: string, car_id: string): Promise<Car> {
      if(!user_id) {
        throw new AppError('Usuário não informado', 400)
      }

      const car = await this.carsRepository.listCarById(user_id, car_id);

      if(!car) {
        throw new AppError('Carro não encontrado', 404)
      }

      return car
    }
}

export { ListCarByIdUseCase };
