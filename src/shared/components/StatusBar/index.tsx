import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import * as S from './styles';

type Props = React.ComponentProps<typeof ExpoStatusBar>;

export function StatusBar({ ...rest }: Props) {
  return (
    <S.Container
      testID="status-bar-container"
      backgroundColor={rest.backgroundColor}
    >
      <ExpoStatusBar {...rest} />
    </S.Container>
  );
}
