import { ICreateCarDTO } from '../dtos/CreateCarDTO';
import { IUpdateCarDTO } from '../dtos/UpdateCarDTO ';
import { Car } from '../entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  listCarsByUserId(user_id: string): Promise<Car[]>;
  listCarById(user_id: string, car_id: string): Promise<Car>;
  deleteCarById(user_id: string, car_id: string): Promise<void>;
  update(car_id: string, user_id: string, data: IUpdateCarDTO): Promise<void>;
}
