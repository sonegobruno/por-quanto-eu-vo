import React from 'react';
import { Box } from 'native-base';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useAuth } from 'hooks/auth';
import nativeBaseTheme from 'styles/native-base-theme';
import { SignOut } from 'phosphor-react-native';
import { LogoutButton, LogoutButtonText } from './styles';

export function Drawer({ ...rest }: DrawerContentComponentProps) {
  const { signOut } = useAuth();
  return (
    <Box flex="1">
      <DrawerContentScrollView {...rest}>
        <Box flex="1" paddingTop={8}>
          <DrawerItemList {...rest} />
        </Box>
      </DrawerContentScrollView>
      <Box mt="auto" p="2">
        <LogoutButton onPress={signOut}>
          <SignOut size={24} color={nativeBaseTheme.colors.neutral[500]} />
          <LogoutButtonText>Sair</LogoutButtonText>
        </LogoutButton>
      </Box>
    </Box>
  );
}
