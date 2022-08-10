import { FormControl } from 'native-base';
import React, { ReactNode } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
  children: ReactNode;
}

export const Label = ({ children }: Props) => {
  return (
    <FormControl.Label
      _text={{
        color: 'neutral.700',
        fontSize: RFValue(16),
      }}
    >
      {children}
    </FormControl.Label>
  );
};
