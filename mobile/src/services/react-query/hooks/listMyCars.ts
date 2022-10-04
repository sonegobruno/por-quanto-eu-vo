import { Car } from 'entities/car/car';
import { carMapper } from 'mappers/carMapper';
import { useQuery } from 'react-query';
import { api } from 'services/api';

export async function getMyCars(): Promise<Car[]> {
  const response = await api.get('/car/my-cars');

  return carMapper(response.data);
}

export function useListMyCars() {
  return useQuery('my-cars', () => getMyCars(), {
    staleTime: 60 * 60 * 24, // 24 hours
  });
}
