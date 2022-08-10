import { NativeBaseProvider } from 'native-base';
import React, { ReactNode } from 'react';
import nativeTheme from 'styles/native-base-theme';

interface Props {
  children: ReactNode;
}

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export function FakeNativeBaseProvider({ children }: Props) {
  return (
    <NativeBaseProvider initialWindowMetrics={inset} theme={nativeTheme}>
      {children}
    </NativeBaseProvider>
  );
}
