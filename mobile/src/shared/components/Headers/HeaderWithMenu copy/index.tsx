import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Flex, IconButton } from 'native-base';
import { List } from 'phosphor-react-native';
import React, { useCallback } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import nativeBaseTheme from 'styles/native-base-theme';
import Logo from '../../../../assets/logo.svg';

export function HeaderWithMenu() {
  const navigation = useNavigation();

  const handleOpenDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  return (
    <Flex alignItems="center" flexDir="row" justifyContent="space-between">
      <Logo width={RFValue(40)} height={RFValue(40)} />
      <IconButton
        onPress={handleOpenDrawer}
        borderRadius="full"
        icon={<List size={32} color={nativeBaseTheme.colors.neutral[600]} />}
      />
    </Flex>
  );
}
