import React from 'react';
import { CheckCircle, Circle } from 'phosphor-react-native';
import nativeBaseTheme from 'styles/native-base-theme';

interface Props {
  isOptionSelected: boolean;
}

export function OptionIcon({ isOptionSelected }: Props) {
  if (isOptionSelected) {
    return (
      <CheckCircle size={18} color={nativeBaseTheme.colors.primary[500]} />
    );
  }

  return <Circle size={18} color={nativeBaseTheme.colors.neutral[700]} />;
}
