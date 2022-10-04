import { Box, Flex, HStack, Text } from 'native-base';
import React from 'react';
import { formatCurrency } from 'shared/utils/formatData';

interface Props {
  gasConsumption: number;
  alcoholConsumption: number;
}

export function FooterCard({ gasConsumption, alcoholConsumption }: Props) {
  return (
    <HStack space="4" mt="3">
      <Box alignItems="center">
        <Flex flexDir="row" alignItems="center">
          <Box bg="primary.500" w="2" h="2" rounded="full" mr="1" />
          <Text bold color="neutral.700">
            Gasolina
          </Text>
        </Flex>
        <Text color="neutral.700">{formatCurrency(gasConsumption)} / Km</Text>
      </Box>
      <Box alignItems="center">
        <Flex flexDir="row" alignItems="center">
          <Box bg="primary.500" w="2" h="2" rounded="full" mr="1" />
          <Text bold color="neutral.700">
            Álcool
          </Text>
        </Flex>
        <Text color="neutral.700">
          {formatCurrency(alcoholConsumption)} / Km
        </Text>
      </Box>
    </HStack>
  );
}
