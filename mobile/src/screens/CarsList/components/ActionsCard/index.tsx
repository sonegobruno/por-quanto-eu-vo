import { HStack, IconButton } from 'native-base';
import React from 'react';
import nativeBaseTheme from 'styles/native-base-theme';
import { Pencil, Trash } from 'phosphor-react-native';

export function ActionsCard() {
  return (
    <HStack space="2" position="absolute" right="4" top="3">
      <IconButton
        size="sm"
        colorScheme="secondary"
        variant="outline"
        icon={
          <Pencil color={nativeBaseTheme.colors.secondary[500]} size={16} />
        }
      />
      <IconButton
        size="sm"
        colorScheme="error"
        variant="outline"
        icon={<Trash color={nativeBaseTheme.colors.error[500]} size={16} />}
      />
    </HStack>
  );
}
