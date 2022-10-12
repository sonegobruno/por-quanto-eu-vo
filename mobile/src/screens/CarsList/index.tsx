/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback } from 'react';
import { HeaderWithMenu } from 'shared/components/Headers/HeaderWithMenu';
import nativeBaseTheme from 'styles/native-base-theme';
import { Plus } from 'phosphor-react-native';
import { FlatList, Text, Divider, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useListMyCars } from 'services/react-query/hooks/listMyCars';
import * as S from './styles';
import { CarCard } from './components/CarCard';
import { EmptyCarListComponent } from './components/EmptyCarListComponent';

export function CarsList() {
  const navigate = useNavigation();
  const { data, isLoading } = useListMyCars();

  const navigateToCreateCar = useCallback(() => {
    navigate.navigate('CreateAndEditCar', {
      from: 'create',
    });
  }, [navigate]);

  return (
    <S.Container>
      <HeaderWithMenu />
      <View flex="1">
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CarCard car={item} />}
          ListEmptyComponent={<EmptyCarListComponent isLoading={isLoading} />}
          ItemSeparatorComponent={() => <Divider bg="neutral.300" />}
          style={{ marginTop: 8 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        />
      </View>
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
