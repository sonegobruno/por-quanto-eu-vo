import { Car } from 'entities/car/car';
import { Text, View } from 'native-base';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActionsCard } from '../ActionsCard';
import { FooterCard } from '../FooterCard';

interface Props {
  car: Car;
}

export function CarCard({ car }: Props) {
  return (
    <View px="3" py="4" w="full" position="relative">
      <Text fontSize="lg" color="neutral.700" maxW={`${RFValue(224)}px`} bold>
        {car.name}
      </Text>
      <Text mt="3" color="neutral.600">
        {car.description}
      </Text>

      <ActionsCard />

      <FooterCard
        gasConsumption={car.gasConsumption}
        alcoholConsumption={car.alcoholConsumption}
      />
    </View>
  );
}
