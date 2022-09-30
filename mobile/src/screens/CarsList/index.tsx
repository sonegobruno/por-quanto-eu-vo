import React, { useCallback } from 'react';
import { HeaderWithMenu } from 'shared/components/Headers/HeaderWithMenu';
import nativeBaseTheme from 'styles/native-base-theme';
import { Plus } from 'phosphor-react-native';

import { FlatList, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useListMyCars } from 'services/react-query/hooks/listMyCars';
import { ActivityIndicator } from 'react-native';
import * as S from './styles';

export function CarsList() {
  const navigate = useNavigation();
  const { data, isLoading } = useListMyCars();

  console.log(data);

  const navigateToCreateCar = useCallback(() => {
    navigate.navigate('CreateCar');
  }, [navigate]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <S.Container>
      <HeaderWithMenu />

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        ListEmptyComponent={<Text>Nenhum carro cadastrado</Text>}
      />

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
