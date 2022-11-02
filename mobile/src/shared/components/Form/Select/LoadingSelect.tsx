import React from 'react';
import { Spinner, View } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  isLoading: boolean;
}

export function LoadingSelect({ isLoading }: Props) {
  if (!isLoading) return null;
  return (
    <View
      w="full"
      bg="neutral.300"
      borderRadius={6}
      borderColor="neutral.400"
      borderWidth={1}
      h={`${RFValue(44)}px`}
      justifyContent="center"
      alignItems="center"
    >
      <Spinner color="neutral.500" />
    </View>
  );
}
