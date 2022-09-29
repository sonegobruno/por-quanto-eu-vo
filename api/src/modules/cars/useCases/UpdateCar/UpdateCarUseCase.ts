import { inject, injectable} from 'tsyringe';
import { AppError } from '../../../../errors';
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { ICreateCarDTO } from '../../dtos/CreateCarDTO';
import { IUpdateCarDTO } from '../../dtos/UpdateCarDTO ';
import { Car } from '../../entities/Car';

@injectable()
class UpdateCarUseCase {

    constructor(
        @inject("CarRepository")
        private carsRepository: ICarsRepository,
    ){}

    public async execute(data: Car): Promise<void> {
      if(!data.id) {
        throw new AppError('Código do carro não informado', 400)
      }

      if(isNaN(data.alcohol_consumption) || !data.alcohol_consumption) {
        throw new AppError('Quantidade consumível de alcool não possui um número válido', 400, 'alcohol_consumption')
      }

      if(isNaN(data.gas_consumption) || !data.gas_consumption) {
        throw new AppError('Quantidade consumível de gasolina não possui um número válido', 400, 'gas_consumption')
      }

      const carExist = await this.carsRepository.listCarById(data.user_id, data.id)

      if(!carExist) {
        throw new AppError('Carro não encontrado', 400)
      }

      await this.carsRepository.update(data.id, data.user_id, {
        alcohol_consumption: data.alcohol_consumption,
        description: data.description,
        gas_consumption: data.gas_consumption,
        name: data.name,
        image_description: data.image_description,
        image_url: data.image_url
      });
    }
}

export { UpdateCarUseCase };
