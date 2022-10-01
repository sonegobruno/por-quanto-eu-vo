import { Car } from 'entities/car/car';
import { Box, Flex, HStack, Text, View } from 'native-base';
import React from 'react';
import { formatCurrency } from 'shared/utils/formatData';

interface Props {
  car: Car;
}

export function CarCard({ car }: Props) {
  return (
    <View px="3" py="4" bg="neutral.200" rounded="md">
      <Text color="neutral.700" bold>
        {car.name}
      </Text>
      <Text color="neutral.600">{car.description}</Text>
      <HStack space="4" mt="1">
        <Box alignItems="center">
          <Flex flexDir="row" alignItems="center">
            <Box bg="primary.500" w="2" h="2" rounded="full" mr="1" />
            <Text bold color="neutral.700">
              Gasolina
            </Text>
          </Flex>
          <Text color="neutral.700">
            {formatCurrency(car.gasConsumption)} / Km
          </Text>
        </Box>
        <Box alignItems="center">
          <Flex flexDir="row" alignItems="center">
            <Box bg="primary.500" w="2" h="2" rounded="full" mr="1" />
            <Text bold color="neutral.700">
              Álcool
            </Text>
          </Flex>
          <Text color="neutral.700">
            {formatCurrency(car.alcoholConsumption)} / Km
          </Text>
        </Box>
      </HStack>
    </View>
  );
}
