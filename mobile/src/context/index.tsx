import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { QueryClientProvider } from 'react-query';
import { NativeBaseProvider } from 'native-base';

import { theme } from 'styles/theme';
import nativeTheme from 'styles/native-base-theme';
import { queryClient } from 'services/query-client';

type AppProvidersProps = {
  children: React.ReactNode;
};

function AppProviders({ children }: AppProvidersProps): JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NativeBaseProvider theme={nativeTheme}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </NativeBaseProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default AppProviders;
