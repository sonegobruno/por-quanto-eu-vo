import { ICreateCarDTO } from '../dtos/CreateCarDTO';
import { Car } from '../entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  listCarsByUserId(user_id: string): Promise<Car[]>;
}
