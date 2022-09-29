import { getRepository, Repository } from 'typeorm';
import { AppError } from '../../../../errors';
import { ICreateCarDTO } from '../../dtos/CreateCarDTO';
import { IUpdateCarDTO } from '../../dtos/UpdateCarDTO ';
import { Car } from '../../entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarRepository implements ICarsRepository{

  private repository: Repository<Car>

  constructor() {
      this.repository = getRepository(Car)
  }

  async update(car_id: string, user_id: string, data: IUpdateCarDTO): Promise<void> {
    try {
      await this.repository.update({ id: car_id, user_id }, data)
    } catch(err) {
      throw new AppError(err);
    }
  }

  async deleteCarById(user_id: string, car_id: string): Promise<void> {
    try {
      await this.repository.delete({
        id: car_id,
        user_id
      })
    } catch(err) {
      throw new AppError(err);
    }
  }

  listCarById(user_id: string, car_id: string): Promise<Car> {
    try {
      const car = this.repository.findOne({
        where: {
          user_id,
          id: car_id
        }
      })

      return car
    } catch(err) {
      throw new AppError(err);
    }
  }


  public async create(data: ICreateCarDTO): Promise<void> {
    try {
      const car = this.repository.create(data)
      await this.repository.save(car)
    } catch(err) {
      throw new AppError(err);
    }
  }

  public async listCarsByUserId(user_id: string): Promise<Car[]> {
    try {
      const cars = await this.repository.find({
        where: {
          user_id
        }
      })

      return cars
    } catch(err) {
      throw new AppError(err);
    }
  }
}

export { CarRepository };
