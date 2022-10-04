import { Flex, Spinner, Text } from 'native-base';
import React from 'react';

interface Props {
  isLoading: boolean;
}
export function EmptyCarListComponent({ isLoading }: Props) {
  if (isLoading) {
    return (
      <Flex flex="1" justifyContent="center">
        <Spinner color="primary.500" size="lg" />
      </Flex>
    );
  }

  return (
    <Flex flex="1" alignItems="center" justifyContent="center">
      <Text bold fontSize="lg" color="neutral.700">
        Nenhum carro cadastrado
      </Text>
      <Text fontSize="sm" color="neutral.600">
        Crie um carro no botão abaixo
      </Text>
    </Flex>
  );
}
