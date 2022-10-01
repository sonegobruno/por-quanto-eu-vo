import { useNavigation } from '@react-navigation/native';
import { Flex, IconButton } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';
import React, { useCallback } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import nativeBaseTheme from 'styles/native-base-theme';
import Logo from '../../../../assets/logo.svg';

export function HeaderBackButton() {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Flex
      alignItems="center"
      flexDir="row"
      justifyContent="space-between"
      px="1"
    >
      <IconButton
        onPress={handleBack}
        borderRadius="full"
        icon={
          <CaretLeft size={24} color={nativeBaseTheme.colors.neutral[600]} />
        }
      />
      <Logo width={RFValue(40)} height={RFValue(40)} />
    </Flex>
  );
}
