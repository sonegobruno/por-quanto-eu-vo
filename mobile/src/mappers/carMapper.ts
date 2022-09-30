import { Car } from 'entities/car/car';
import { CarDTO } from 'entities/car/car.dto';

export function carMapper(data: CarDTO): Car[] {
  return data.cars.map(car => ({
    id: car.id,
    name: car.name,
    description: car.description,
    alcoholConsumption: car.alcohol_consumption,
    gasConsumption: car.gas_consumption,
  }));
}
