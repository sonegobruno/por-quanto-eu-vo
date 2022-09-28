import React from 'react';
import { Box, Text } from 'native-base';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuth } from 'hooks/auth';

export function CustomDrawer({ ...rest }: DrawerContentComponentProps) {
  const { signOut } = useAuth();
  return (
    <Box flex="1">
      <DrawerContentScrollView {...rest}>
        <Box flex="1" paddingTop={8}>
          <DrawerItemList {...rest} />
        </Box>
      </DrawerContentScrollView>
      <Box mt="auto">
        <TouchableOpacity onPress={signOut}>
          <Text>Sair</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
}
