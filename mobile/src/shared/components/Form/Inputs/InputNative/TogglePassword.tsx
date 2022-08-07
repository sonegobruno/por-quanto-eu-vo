import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';

interface Props {
  passwordIsVisible: boolean;
  onTogglePasswordVisibility: () => void;
}

export const TogglePassword = ({
  onTogglePasswordVisibility,
  passwordIsVisible,
}: Props) => {
  return (
    <Icon
      as={
        <MaterialIcons
          name={passwordIsVisible ? 'visibility' : 'visibility-off'}
        />
      }
      size={5}
      mr="2"
      color="muted.400"
      onPress={onTogglePasswordVisibility}
    />
  );
};
