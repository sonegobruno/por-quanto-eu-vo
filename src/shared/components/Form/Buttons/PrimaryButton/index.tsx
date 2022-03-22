import React from 'react';
import { Button, ButtonProps } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

import * as S from './styles';

type Props = ButtonProps;

export function PrimaryButton({ ...rest }: Props) {
  return (
    <Button
      type="solid"
      buttonStyle={[S.styles.buttonStyle, rest.buttonStyle]}
      titleStyle={[
        {
          fontSize: RFValue(18),
          fontWeight: '700',
        },
        rest.titleStyle,
      ]}
      {...rest}
    />
  );
}
