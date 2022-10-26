import { useNavigation, useRoute } from '@react-navigation/native';
import { Car } from 'entities/car/car';
import { UniqueCarDTO } from 'entities/car/car.dto';
import { uniqueCarMapper } from 'mappers/carMapper';
import React, { useEffect, useState } from 'react';
import { api } from 'services/api';

import { HeaderBackButton } from 'shared/components/Headers/HeaderBackButton';
import { Heading } from 'shared/components/Heading';
import { LoadingPage } from 'shared/components/LoadingPage';
import { apiResponseErrors } from 'shared/utils/apiResponseErrors';
import { validateRouteParams } from 'shared/utils/validateRouteParams';
import { CreateAndEditCarForm } from './CreateAndEditCarForm';

import { Container, Content } from './styles';

export type TypePage = 'create' | 'edit' | '';

export function CreateAndEditCar() {
  const route = useRoute();
  const navigation = useNavigation();
  const [car, setCar] = useState<Car | null>(null);
  const [isLoadingCar, setIsLoadingCar] = useState(false);
  const [type, setType] = useState<TypePage>('');

  useEffect(() => {
    if (!validateRouteParams(route.params, 'from', 'string')) {
      navigation.goBack();
      return;
    }

    if (!(route.params.from === 'create' || route.params.from === 'edit')) {
      navigation.goBack();
      return;
    }

    if (route.params.from === 'edit') {
      if (!validateRouteParams(route.params, 'carId', 'string')) {
        navigation.goBack();
        return;
      }

      setIsLoadingCar(true);

      api
        .get<UniqueCarDTO>(`car/${route.params.carId}`)
        .then(({ data }) => {
          setCar(uniqueCarMapper(data));
        })
        .catch(err => {
          apiResponseErrors(err);
        })
        .finally(() => {
          setIsLoadingCar(false);
        });
    }

    setType(route.params.from);
  }, [route.params, navigation]);

  const prefixSubTitle = type === 'create' ? 'Cadastre' : 'Atualize';

  return (
    <Container>
      <HeaderBackButton />
      <Content>
        <Heading
          title={type === 'create' ? 'Cadastrar carro' : 'Atualizar carro'}
          subTitle={`${prefixSubTitle} seu carro em nosso sistema para realizar${'\n'}o cálculo do combustível`}
        />

        {isLoadingCar ? (
          <LoadingPage />
        ) : (
          <CreateAndEditCarForm car={car} type={type} />
        )}
      </Content>
    </Container>
  );
}
