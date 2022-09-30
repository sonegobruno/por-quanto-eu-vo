import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { formatCurrency } from 'shared/utils/formatData';

import { StatusBar } from 'shared/components/StatusBar';
import { Button } from 'shared/components/Form/Buttons/Button';
import { Heading } from 'native-base';
import { validateRouteParams } from 'shared/utils/validateRouteParams';
import * as S from './styles';

export function GasPriceShow() {
  const route = useRoute();
  const navigation = useNavigation();
  const [amountCurrency, setAmountyCurrency] = useState(0);

  useEffect(() => {
    if (validateRouteParams(route.params, 'amountCurrency', 'number')) {
      setAmountyCurrency(route.params.amountCurrency);
    } else {
      navigation.navigate('Home');
    }
  }, [route.params, navigation]);

  return (
    <>
      <StatusBar style="dark" translucent backgroundColor="#F8F9F9" />

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

        <Heading
          color="neutral.500"
          fontSize="2xl"
          lineHeight="md"
          textAlign="center"
        >
          Você irá gastar em {'\n'} seu trajeto
        </Heading>

        <Heading color="primary.500" fontSize="5xl" textAlign="center" mt="8">
          {formatCurrency(amountCurrency)}
        </Heading>

        <Heading color="neutral.500" fontSize="lg" textAlign="center" mt="10">
          Deseja somar novos valores?
        </Heading>

        <Button
          testID="gas-price-show-back-button"
          title="Somar novo valor"
          onPress={navigation.goBack}
          mt="8"
        />
      </S.Container>
    </>
  );
}
