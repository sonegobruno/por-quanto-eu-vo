import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';

import * as S from './styles';

type Params = {
  amountCurrency: string;
};

export function GasPriceShow() {
  const route = useRoute();
  const { amountCurrency } = route.params as Params;
  const { goBack } = useNavigation<any>();

  return (
    <S.Container>
      <S.Title>Você irá gastar em {'\n'} seu trajeto</S.Title>
      <S.Amount>{amountCurrency}</S.Amount>
      <S.BackPageText>Deseja somar novos valores?</S.BackPageText>
      <S.BackButton title="Somar novo valor" onPress={goBack} />
    </S.Container>
  );
}
