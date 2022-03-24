import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { StatusBar } from 'shared/components/StatusBar';
import * as S from './styles';

type Params = {
  amountCurrency: string;
};

export function GasPriceShow() {
  const route = useRoute();
  const { amountCurrency } = route.params as Params;
  const { goBack } = useNavigation<any>();

  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="#EEEEF2" />

      <S.Container>
        <S.AnimationWrapper>
          <LottieView
            source={require('../../assets/animation/gas-station.json')}
            style={{
              width: '100%',
              height: RFValue(200),
            }}
            resizeMode="contain"
            autoPlay
            loop
          />
        </S.AnimationWrapper>

        <S.Title>Você irá gastar em {'\n'} seu trajeto</S.Title>
        <S.Amount>{amountCurrency}</S.Amount>
        <S.BackPageText>Deseja somar novos valores?</S.BackPageText>
        <S.BackButton title="Somar novo valor" onPress={goBack} />
      </S.Container>
    </>
  );
}
