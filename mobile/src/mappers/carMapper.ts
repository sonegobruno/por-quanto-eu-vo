import { Car } from 'entities/car/car';
import { CarDTO, UniqueCarDTO } from 'entities/car/car.dto';

export function carMapper(data: CarDTO): Car[] {
  return data.cars.map(car => ({
    id: car.id,
    name: car.name,
    description: car.description,
    alcoholConsumption: car.alcohol_consumption,
    gasConsumption: car.gas_consumption,
  }));
}

export function uniqueCarMapper(data: UniqueCarDTO): Car {
  return {
    id: data.car.id,
    name: data.car.name,
    description: data.car.description,
    alcoholConsumption: data.car.alcohol_consumption,
    gasConsumption: data.car.gas_consumption,
  };
}
