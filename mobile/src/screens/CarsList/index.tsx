import React, { useCallback } from 'react';
import { HeaderWithMenu } from 'shared/components/Headers/HeaderWithMenu';
import nativeBaseTheme from 'styles/native-base-theme';
import { Plus } from 'phosphor-react-native';

import { Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles';

export function CarsList() {
  const navigate = useNavigation();

  const navigateToCreateCar = useCallback(() => {
    navigate.navigate('CreateCar');
  }, [navigate]);

  return (
    <S.Container>
      <HeaderWithMenu />
      <S.CreateCarButton
        onPress={navigateToCreateCar}
        icon={<Plus size={20} color={nativeBaseTheme.colors.neutral[100]} />}
        label={
          <Text color="neutral.100" fontSize="md" bold>
            Criar Carro
          </Text>
        }
      />
    </S.Container>
  );
}
